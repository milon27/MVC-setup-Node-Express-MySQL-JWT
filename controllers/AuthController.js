/**
 * @design by milon27
 */
const bcryptjs = require('bcryptjs')
const AuthModel = require('../models/AuthModel')
const Response = require('../models/Response')
const DB_Define = require('../utils/DB_Define')
const Define = require('../utils/Define')
const Helper = require('../utils/Helper')

const AuthController = {
    /**
     * @description  
     * get email, name, pass from req.body
     * do validatioin
     * ck already have an account or not(mySql Optional,Mongo required)
     * create password hash,save into database
     * generate a jwt access token,set into http cookie
     * return new user object as response
     * @param { email, name, pass} =req.body
     * @response {error(boolean), message(String), response(object:USER)}
     */
    signUp: async (req, res) => {
        try {
            const { email, name, pass } = req.body
            //validatioin
            if (!email || !name || !pass) {
                throw new Error("Enter email,name,pass")
            }
            if (pass.length < 6) {
                throw new Error("pass length should be atleast 6 char.")
            }
            //get hash pass & save new user into db
            const hashpass = await bcryptjs.hash(pass, await bcryptjs.genSalt(10))
            const user = {
                email,
                name,
                pass: hashpass
            }
            new AuthModel().addData(DB_Define.USERS_TABLE, user, (err, results) => {
                if (err) {
                    let response = new Response(true, err.message, err);
                    res.send(response);
                } else {
                    //get token and set into cookie
                    const expireAt = Helper.getExpireDay(Define.TOKEN_EXPIRE_DAY)
                    const token = Helper.getJWTtoken(email, expireAt)
                    //send token in http cookie
                    //new Date(Date.now() + 900000)
                    res.cookie(Define.TOKEN, token, {
                        httpOnly: true,
                        expires: new Date(expireAt)
                    })
                    delete user.pass
                    user['id'] = results.insertId
                    user['token'] = token

                    res.status(200).json(new Response(false, "user created successfully", user))
                }
            })//end db

        } catch (e) {
            let response = new Response(true, e.message, e);
            res.send(response);
        }

    },//end create user.
    login: async (req, res) => {
        try {
            const { email, pass } = req.body
            //validatioin
            if (!email || !pass) {
                throw new Error("Enter email,password")
            }

            //check user is available or not in db
            new AuthModel().getUserByEmail(DB_Define.USERS_TABLE, email, async (err, results) => {
                try {
                    if (err) {
                        throw err
                    } else {
                        if (results.length == 0) {
                            throw new Error("no user found with this email")
                        }
                        const user = results[0]
                        const ckPass = await bcryptjs.compare(pass, user.pass)
                        if (!ckPass) {
                            throw new Error("Wrong email or password")
                        }

                        //get token and set into cookie

                        const expireAt = Helper.getExpireDay(Define.TOKEN_EXPIRE_DAY)
                        const token = Helper.getJWTtoken(email, expireAt)
                        //send token in http cookie
                        //new Date(Date.now() + 900000)
                        res.cookie(Define.TOKEN, token, {
                            httpOnly: true,
                            expires: new Date(expireAt)
                        })

                        delete user.pass
                        user['token'] = token
                        res.status(200).json(new Response(false, "user logged in successfully", user))
                    }
                } catch (e) {
                    let response = new Response(true, e.message, e);
                    res.send(response);
                }
            })//end db
        } catch (e) {
            let response = new Response(true, e.message, e);
            res.send(response);
        }
    },//login
    logout: (req, res) => {
        res.cookie(Define.TOKEN, "", {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json(new Response(false, "user logged out", {}))
    },//logout
    isLoggedIn: (req, res) => {
        try {
            const token = req.cookies.token
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            Helper.verifyJWTtoken(token)

            res.send(true)// logged in
        } catch (e) {
            //remove the old/expire token
            res.cookie("token", "", {
                httpOnly: true,
                expires: new Date(0)
            })
            res.send(false)//not logged in
        }
    },//isLoggedIn

}

module.exports = AuthController