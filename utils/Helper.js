require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');

const Helper = {
    //@get a date after 1 day @return miliseconds
    getExpireDay: (day = 1) => {
        return moment().add(day, Define.DAYS).valueOf();
    },
    //@return token:String
    getJWTtoken: (email, expires) => {
        if (expires) {
            return jwt.sign({ email: email }, process.env.ACCESS_SECRET, { expiresIn: expires });
        } else {
            return jwt.sign({ email: email }, process.env.ACCESS_SECRET);
        }
    },
    //@return email:String || throw Error
    verifyJWTtoken: (token) => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            const email = jwt.verify(token, process.env.ACCESS_SECRET)
            return email
        } catch (e) {
            throw new Error("Unauthorized Access")
        }
    },
    //
}
module.exports = Helper