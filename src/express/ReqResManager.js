const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const PathManager = require("./PathManager");
const Config = require("../util/Config");

class ReqResManager {
    constructor(req, res) {
        [this.req, this.res] = [req, res];
    }

    respond() {
        let { req, res } = this;
        let parsedUrl = url.parse(req.url);
        let urlPath = parsedUrl.pathname;
        let parsedPath = path.parse(urlPath);
        let viewsDir = res.app.settings.views;
        let { document, host } = new Config();

        let match = false;
        for (var h of host.hosts) {
            if (this.wildTest(h, req.host)) {
                match = true;
            }
        }
        if (!match) return;

        let file = PathManager.get(urlPath, req, res);
        if (!file) return;

        let fPath = `${viewsDir}${urlPath}`;
        if (fs.existsSync(fPath)) {
            let stat = fs.lstatSync(fPath);
            if (stat.isDirectory()) {
                if (!urlPath.endsWith("/")) {
                    let search = parsedUrl.search || "";
                    let slashAddedPath = `${parsedUrl.pathname}/${search}`;
                    res.redirect(slashAddedPath);
                    return;
                }
            }
        }

        res.setHeader("Content-Type", "text/html");

        switch (true) {
            case (parsedPath.ext == ""):
                if (urlPath.endsWith("/")) {
                    let indexEjs = "index.ejs"; // TODO: index.ejs to config
                    let indexPath = path.normalize(`${viewsDir}${urlPath}${indexEjs}`);
                    if (fs.existsSync(indexPath)) {
                        this.render(urlPath + indexEjs, path.dirname(indexPath));
                        break;
                    } else {
                        res.writeHead(403, "Forbidden");
                        res.end("403"); // TODO: Customize
                        break;
                    }
                } else {
                    let filePath = path.normalize(`${viewsDir}${urlPath}.ejs`);
                    if (fs.existsSync(filePath)) {
                        this.render(urlPath, path.dirname(filePath));
                        break;
                    } else {
                        // no break
                    }
                }
            case (parsedPath.ext != ""):
                let filePath = path.normalize(`${viewsDir}${urlPath}`);
                if (fs.existsSync(filePath)) {
                    let contentType = mime.lookup(parsedPath.ext);
                    res.setHeader("Content-Type", contentType);
                    res.end(fs.readFileSync(filePath));
                    break;
                } else {
                    // no break
                }
            default:
                res.writeHead(404, "Not Found");
                res.end("404"); // TODO: Customize
        }
    }

    render(urlPath, absoluteDir) {
        let { req, res } = this;
        urlPath = urlPath.startsWith("/") ? urlPath.substring(1) : urlPath;
        res.render(urlPath, { req: req, res: res, require: require, __dirname: absoluteDir });
    }

    wildTest(wildcard, str) {
        let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
        const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
        return re.test(str); // remove last 'i' above to have case sensitive
    }
}

module.exports = ReqResManager;
