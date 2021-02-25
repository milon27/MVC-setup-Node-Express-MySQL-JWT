/**
 * @design by milon27
 */
const DbModel = require('../models/DbModel')
const Response = require('../models/Response')


const DbController = {
    /**
     * @description  
     * @param { id,email, name, pass}
     * @response {error(boolean), message(String), response(object:USER)}
     */
    create_users_table: async (req, res) => {
        try {
            new DbModel().create_users_table((err, results) => {
                if (err) {
                    let response = new Response(true, err.message, err);
                    res.send(response);
                } else {
                    res.status(200).json(new Response(false, "user table created successfully", {}))
                }
            })
        } catch (e) {
            let response = new Response(true, e.message, e);
            res.send(response);
        }
    },//end create user.
    /**
     * @description  
     * @param { id,data}
     * @response {error(boolean), message(String), response(object:USER)}
     */
    create_data_table: async (req, res) => {
        try {
            new DbModel().create_data_table((err, results) => {
                if (err) {
                    let response = new Response(true, err.message, err);
                    res.send(response);
                } else {
                    res.status(200).json(new Response(false, "data table created successfully", {}))
                }
            })
        } catch (e) {
            let response = new Response(true, e.message, e);
            res.send(response);
        }
    },//end create user.


}

module.exports = DbController