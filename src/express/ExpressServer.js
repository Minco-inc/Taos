const ejs = require("ejs");
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const Events = require("events");
const BeforeResponse = require("./BeforeResponse");
const ReqResManager = require("./ReqResManager");
const Config = require("../util/Config");

class ExpressServer {
    constructor() {
        let config = this.config = new Config();
        let app = this.app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(this.errorHandler);

        app.set("views", config.document.documentRoot);
        app.set("view engine", "ejs");

        app.all('*', (req, res) => {
            let bef = new BeforeResponse(req, res);
            let rrm = new ReqResManager(req, res);
            rrm.respond();
        });
    
        let httpsOptions = {
            cert: fs.readFileSync(config.host.https.cert, 'utf-8'),
            key: fs.readFileSync(config.host.https.key, 'utf-8'),
        };

        let httpsServer = this.httpsServer = https.createServer(httpsOptions, app);
        let httpServer = this.httpServer = http.createServer(app);
        
        let events = this.events = new Events();
        Object.assign(this, events);
    }

    listen() {
        let { config, events } = this;
        this.httpsServer.listen(config.host.https.port, events.emit("httpsReady"));
        this.httpServer.listen(config.host.http.port, events.emit("httpReady"));
    }

    errorHandler(err, req, res, next) {
        res.writeHead(500, "Internal Server Error");
        res.end("500"); // TODO: Customize This
        console.error(err);
    }
}

module.exports = ExpressServer;
