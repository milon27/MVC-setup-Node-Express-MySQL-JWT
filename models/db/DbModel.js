const DB_Define = require("../../utils/DB_Define");
const Model = require("../Model");

class DbModel extends Model {
    //table#1: users
    create_users_table(callback) {
        const table_name = DB_Define.USERS_TABLE
        let sql = `CREATE TABLE ${table_name}(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name varchar(200),
            email varchar(200) UNIQUE,
            pass varchar(200),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        this.db.query(sql, callback);
    }
    create_data_table(callback) {
        const table_name = DB_Define.DATA_TABLE
        let sql = `CREATE TABLE ${table_name}(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            data varchar(200),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        this.db.query(sql, callback);
    }

}
module.exports = DbModel;