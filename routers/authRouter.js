/**
 * @design by milon27
 */
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')


/**
 * @description 1. create a new user then login user
 * @param { email:String, name:String, pass:String } = req.body
 * @endpoint http://localhost:2727/auth/signup
 * @example same
 */
router.post('/signup', AuthController.signUp)

/**
 * @description 2. login user
 * @param { email:String, pass:String } = req.body
 * @endpoint http://localhost:2727/auth/login
 * @example same
 */
router.post('/login', AuthController.login)

/**
 * @description 3. logout user
 * @endpoint http://localhost:2727/auth/logout
 * @example same
 */
router.get('/logout', AuthController.logout)

/**
 * @description 4. ck logged in or not
 * @endpoint http://localhost:2727/auth/is-loggedin
 * @example same
 */
router.get('/is-loggedin', AuthController.isLoggedIn)

module.exports = router