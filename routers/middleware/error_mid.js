const Response = require("../../models/Response");

const error_mid = (e, req, res, next) => {
    console.log("milon", e.code);
    if (e.code !== 'EBADCSRFTOKEN') {
        return next(e);
    }
    res.status(403).json(new Response(true, e.message, e))
}


module.exports = error_mid