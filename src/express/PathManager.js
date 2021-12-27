const fs = require("fs");
const wcmatch = require("wildcard-match");
const Config = require("../util/Config");

class PathManager {
    static get(path, req, res) {
        let { unusualPathDir } = new Config();
        let unusualPaths = fs.readdirSync(unusualPathDir).filter(f => f.endsWith(".js"));

        let unusuals = {};
        unusualPaths.forEach(unusualPath => {
            let unusual = require(`${unusualPathDir}/${unusualPath}`);
            unusuals[unusual.name] = unusual;
        });
        
        let unusual = false;
        for (let name in unusuals) {
            let isMatch = wcmatch(name);
            let escapedPath = path.substring(1);
            console.log("PM", name, escapedPath, isMatch(escapedPath));
            if (isMatch(escapedPath)) {
                unusual = unusuals[name];
                break;
            }
        }

        let returnVal;
        if (unusual) {
            console.log("PM", unusual);
            unusual.handle(req, res);
            returnVal = false;
        } else {
            returnVal = path;
        }

        if (returnVal) { if (!(returnVal.startsWith("/"))) returnVal = `/${returnVal}`; }

        return returnVal;
    }
}

module.exports = PathManager;
