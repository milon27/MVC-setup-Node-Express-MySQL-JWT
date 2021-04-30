/**
 * @design by milon27
 */

const Response = require('../../models/Response');
const Helper = require('../../utils/Helper');
const auth_mid = (req, res, next) => {

    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error("Unauthorized Access")
        }
        //token validation
        const email = Helper.verifyJWTtoken(token)
        //set user email in request
        req.email = email
        next()
    } catch (e) {
        res.status(401).json(new Response(true, e.message, e))
    }

}

module.exports = auth_mid;