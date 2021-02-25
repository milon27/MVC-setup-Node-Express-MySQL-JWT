/**
 * @design by milon27
 */

const DataModel = require("../models/DataModel")
const Response = require('../models/Response')
const DB_Define = require("../utils/DB_Define")

const DataController = {
    /**
     * @description add new data
     * @param { data: String } = req.body
     * @response {error(boolean), message(String), response(object:any)}
     */
    newData: (req, res) => {
        const { data } = req.body
        try {
            //validation
            if (!data) {
                throw new Error("Enter Data")
            }
            new DataModel().addData(DB_Define.DATA_TABLE, { data }, (err, results) => {
                if (err) {
                    let response = new Response(true, err.message, err);
                    res.send(response);
                } else {
                    //get token and set into cookie
                    const obj = {
                        id: results.insertId,
                        data: data
                    }
                    res.status(200).json(new Response(false, "data created successfully", obj))
                }
            })//end db
        } catch (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        }
    },

    /**
     * @description get all data from a specific table order by a field
     * @param {table} table name
     * @param {field} field name
     * @response {error(boolean), message(String), response(object:any)}
     */
    getAll: (req, res) => {
        const table = req.params.table
        const field = req.params.field

        new DataModel().getAll(table, field, (err, results) => {
            if (err) {
                let response = new Response(500, err.message, err);
                res.send(response);
            } else {
                if (results && results.length > 0) {
                    let response = new Response(false, " Data list get Successfully", results);
                    res.status(200).send(response);
                } else {
                    let response = new Response(true, " Data list NOT FOUND", []);
                    res.status(200).send(response);
                }
            }
        })
    },//end getAll

    /**
     * @description get all data from a specific table order by a field using pagination
     * @param {table} table name
     * @param {field} field name
     * @param {page} 1,2,3,4.. (page number)
     * @response {error(boolean), message(String), response(object:any)}
     */
    getPaginateList: (req, res) => {
        const table = req.params.table
        const page = req.params.page
        const field = req.params.field
        //error, message, data: response
        new DataModel().getPaginateList(page, table, field, (err, results) => {
            if (err) {
                let response = new Response(500, err.message, err);
                res.send(response);
            } else {
                if (results && results.length > 0) {
                    let response = new Response(false, " Data list get Successfully", results);
                    res.status(200).send(response);
                } else {
                    let response = new Response(true, " Data list NOT FOUND", []);
                    res.status(200).send(response);
                }
            }
        })
    }//end getPaginateList

}

module.exports = DataController