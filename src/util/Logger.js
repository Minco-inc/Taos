const chalk = require("chalk");
const fs = require("fs");
const Config = require("./Config");
const logFile = "latest.log";

class Logger {
    constructor() {
        let config = new Config();
        let { logDir, dumpOnSigInt } = config.logger;

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        let stream = fs.createWriteStream(`${logDir}/${logFile}`);
        process.stdout.write = process.stderr.write = stream.write.bind(stream);

        if (dumpOnSigInt) {
            process.on("SIGINT", () => {
                stream.end();
                let date = new Date(Date.now());
                let dateString = date.toLocaleString('en-US', { hour12: false }).replaceAll("/", ".").replaceAll(", ", "_");
                fs.copyFileSync(`${logDir}/${logFile}`, `${logDir}/${dateString}.dump.log`);
                process.exit();
            });
        }

        let realConsoleLog = console.log.bind({});
        console.log = (...args) => {
            let date = new Date(Date.now());
            let dateStr = date.toLocaleString('en-US', { hour12: false });
            realConsoleLog(`[Taos; ${dateStr}]`, ...args);
        }
    }
}

module.exports = Logger;
