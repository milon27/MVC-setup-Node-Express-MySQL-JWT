const csurf = require('csurf');
const Define = require('../../utils/Define');
const ignoreMethods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
]
const csrfInit = csurf({
    ignoreMethods: ignoreMethods, cookie: Define.SESSION_COOKIE_OPTION
});

const csrfProtection = csurf({
    cookie: Define.SESSION_COOKIE_OPTION
});

const csrfToken = (req, res, next) => {
    const token = req.csrfToken()
    res.cookie('XSRF-TOKEN', token);
    next();
}
module.exports = {
    csrfInit,
    csrfProtection,
    csrfToken
};