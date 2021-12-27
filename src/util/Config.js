const path = require("path");
const config = require("../../config");

class Config {
    constructor() {
        for (var prop in config) {
            let conf = path.normalize(config[prop]);
            let configPath = path.normalize(this.root() + conf);
            let configData = configPath;
            try {
                configData = require(configPath);
            } catch (e) {}
            this[prop] = configData;
        }
    }

    root() {
        let root = path.dirname(require.main.filename);
        return root;
    }
}

module.exports = Config;
