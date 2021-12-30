const mysql = require('mysql')
require('dotenv').config();

const host = (`${process.env.NODE_ENV}` === "dev") ? `${process.env.HOST2}` : `${process.env.P_HOST}`;//private field
const user = (`${process.env.NODE_ENV}` === "dev") ? `${process.env.USER2}` : `${process.env.P_USER}`;//private field
const pass = (`${process.env.NODE_ENV}` === "dev") ? `${process.env.PASS2}` : `${process.env.P_PASS}`;//private field
const database = (`${process.env.NODE_ENV}` === "dev") ? `${process.env.DB2}` : `${process.env.P_DB}`;//private field
const port = (`${process.env.NODE_ENV}` === "dev") ? `${process.env.PORT2}` : `${process.env.P_PORT}`;//private field



console.log(host, user, pass, database);

//database: database connection via pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    port: port,
    password: pass,
    database: database,
    timezone: 'gmt+6'  //<-here this line was missing 'utc'
});


// pool.on('acquire', function (connection) {
//     console.log('Connection %d acquired', connection.threadId);
// });

// pool.on('release', function (connection) {
//     console.log('Connection %d released', connection.threadId);
// });


// pool.connect((e) => {
//     if (e) {
//         console.log("conection failed! error: " + e.message);
//         return;
//     }
//     console.log("conection success");
// });

module.exports = pool