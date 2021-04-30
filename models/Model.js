/**
 * @design by milon27
 */

require('dotenv').config();

const pool = require('./config')
const Define = require('../utils/Define');

/**
 * @description base model for all model
 * @property {db} this can be used to access the database
 */

class Model {
    //mysql config
    db = pool

    //common operation

    //get a data
    getOne = async (table, field, value, callback) => {
        let sql = `SELECT * FROM ${table} WHERE ??=?`;
        this.db.query(sql, [field, value], callback);
    }

    //insert into a specific table
    /**
     * @param {table name} table 
     * @param {what you want to insert} obj 
     * @param {err,results()=>{}} callback 
     */
    addData = (table, obj, callback) => {
        let sql = `INSERT INTO ${table} SET ?`;
        this.db.query(sql, obj, callback);
    }
    //update a specific row on a table
    /**
    * @param {table name} table
    * @param {what you want to insert} obj
    * @param {err,results()=>{}} callback
    */
    updateData = (table, obj, callback) => {
        let sql = `UPDATE ${table} SET ? WHERE id = ?`;
        this.db.query(sql, [obj, obj.id], callback);
    }
    //delete a specific row on a table
    /**
    * @param {table name} table
    * @param {id} id
    * @param {err,results()=>{}} callback
    */
    deleteData = (table, id, callback) => {
        let sql = `DELETE FROM ${table} WHERE id = ?`;
        this.db.query(sql, id, callback);
    }
    //get all data from a table in decending order by a field
    getAll = async (table, field, callback) => {
        let sql = `SELECT * from ${table} ORDER BY ${field} DESC`;
        this.db.query(sql, callback);
    }

    //get all data from a table in filter by a field and order by field
    getAllByField = async (table, field, value, order_field, callback) => {
        let sql = `SELECT * from ?? WHERE ?? =?  ORDER BY ?? DESC`;
        this.db.query(sql, [table, field, value, order_field], callback);
    }

    //get all data from a table in decending order by a field with pagination
    /**
     * @param {page} page number (1,2,3,4..)
     * @param {table} tabel name 
     * @param {field} where filter apply on which field
     * @param {value} where filter value
     * @param {order_field} order by field
     * @param {callback} (error,results)=>{}
     */
    getPaginateList = (page, table, field, value, field2 = "", value2 = -1, order_field, callback) => {

        //implement pagination here later
        const page_size = Define.PAGINATE_PAGE_SIZE;
        let skip = (page - 1) * page_size;

        let sql = "";
        if (value2 === -1 && field2 === "") {
            sql = `SELECT * from ${table} WHERE ?? =? ORDER BY ?? DESC LIMIT ? OFFSET ? `;
            this.db.query(sql, [field, value, order_field, page_size, skip], callback);
        } else {
            sql = `SELECT * from ${table} WHERE ?? =? AND ??=? ORDER BY ?? DESC LIMIT ? OFFSET ? `;
            this.db.query(sql, [field, value, field2, value2, order_field, page_size, skip], callback);
        }

    }
}

module.exports = Model