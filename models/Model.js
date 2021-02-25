/**
 * @design by milon27
 */

const mysql = require('mysql')
require('dotenv').config();

/**
 * @description base model for all model
 * @property {db} this can be used to access the database
 */
class Model {
    //mysql config
    #host = `${process.env.HOST}`;//private field
    #user = `${process.env.USER}`;//private field
    #pass = `${process.env.PASS}`;//private field
    #database = `${process.env.DB}`;//private field

    //database: database connection
    db = mysql.createConnection({
        host: this.#host,
        user: this.#user,
        password: this.#pass,
        database: this.#database,
        timezone: 'utc'  //<-here this line was missing
    });
    //test the dabase connection
    testConnection = () => {
        this.db.connect((e) => {
            if (e) {
                console.log("conection failed! error: " + e.message);
                return;
            }
            console.log("conection success");
        });
    }

    //common operation
    //get a data 
    getOne = async (table, id, callback) => {
        let sql = `SELECT * from ${table} WHERE id = ?`;
        this.db.query(sql, id, callback);
    }
    //insert into a specific table
    addData = (table, obj, callback) => {
        let sql = `INSERT INTO ${table} SET ?`;
        this.db.query(sql, obj, callback);
    }
    //update a specific row on a table
    updateData = (table, obj, callback) => {
        let sql = `UPDATE ${table} SET ? WHERE id = ?`;
        this.db.query(sql, [obj, obj.id], callback);
    }
    //delete a specific row on a table
    deleteData = (table, id, callback) => {
        let sql = `DELETE FROM ${table} WHERE id = ?`;
        this.db.query(sql, id, callback);
    }
    //get all data from a table in decending order by a field
    getAll = async (table, field, callback) => {
        let sql = `SELECT * from ${table} ORDER BY ${field} DESC`;
        this.db.query(sql, callback);
    }
    //get all data from a table in decending order by a field with pagination
    getPaginateList = (page, table, field, callback) => {
        //implement pagination here later
        const page_size = 3;
        let skip = (page - 1) * page_size;

        let sql = `SELECT * from ${table} ORDER BY ${field} DESC LIMIT ? OFFSET ? `;
        this.db.query(sql, [page_size, skip], callback);
    }
}

module.exports = Model