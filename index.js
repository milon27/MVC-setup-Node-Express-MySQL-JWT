/**
 * @design by milon27
 */
const express = require('express');
const cors = require('cors')
const cookieparser = require('cookie-parser')
require('dotenv').config();
const app = express();

/**
 * @middleware
 */
//url encode + json encode
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser())// parse http cookie
//enable cros 
app.use(cors({
    origin: ["http://localhost:3000/"],
    credentials: true
}))
/**
 * @enable cookie store in front end
 * axios.post('url',{},{withCredentials:true}) or
 * axios.defaults.withCredentials=true
 */

/**
 * @routers
 */

//description use for all type DB tables @author milon27
app.use('/db', require('./routers/dbRouter'));

//@description auth (signup,login,logout,isLoggedIn) @author milon27
app.use('/auth', require('./routers/authRouter'));

//@description use for all type of CRUD operation @author milon27 
app.use('/data', require('./routers/dataRouter'));

//@description .... @author ....


const port = process.env.PORT || 2828;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})