class Error {
    constructor(doc) {
        this.doc = doc;
    }
    
    error(code, { req, res }) {
        req.query = {};
        req.query.code = code;
        res.status(code);
        res.render(this.doc, {
            req: req,
            require: (...args) => require(...args)
        });
    }
}

module.exports = Error;
