const path = require("path");
const EventEmitter = require("events");
const ExpressServer = require("./express/ExpressServer");
const Config = require("./util/Config");
const Logger = require("./util/Logger");

class Main {
    constructor() {
        process.on("uncaughtException", (err) => {
            console.error(err);
        });
        process.on("unhandledRejection", (err) => {
            console.error(err);
        });

        let host = this.host = new Config().host;
        let server = this.server = new ExpressServer(host);
        let logger = this.logger = new Logger();
    }

    on(...args) {
        this.server.events.on(...args);
    }

    start() {
        this.server.listen();
    }
}

module.exports = Main;
