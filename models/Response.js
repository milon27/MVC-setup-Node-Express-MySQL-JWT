/**
 * @design by milon27
 */

class Response {
    //boolean,string,obj
    constructor(error, message, data) {
        this.error = error;
        this.message = message;
        this.response = data;
    }
}

module.exports = Response;