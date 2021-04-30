const Model = require("../Model");

class AuthModel extends Model {
    getUserByEmail = async (table, email, callback) => {
        let sql = `SELECT * from ${table} WHERE email = ?`;
        this.db.query(sql, email, callback);
    }
}

module.exports = AuthModel