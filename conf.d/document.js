const Config = require("../src/util/Config");

module.exports = {
    documentRoot: new Config().root() + "/views",
    errorDocument: {
        "403": "data:text/plain;charset=utf-8,403",
        "404": "data:text/plain;charset=utf-8,404"
    }
}
