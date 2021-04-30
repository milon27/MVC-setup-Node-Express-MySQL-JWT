const Define = {
    API_BASE_URL: "http://localhost:2727/",
    //user access token
    TOKEN: "token",
    SESSION_COOKIE_OPTION: {
        httpOnly: true,
        secure: false,//only for browser
        sameSite: 'lax',
        //maxAge: 1 * 24 * 60 * 60 * 1000//1 day in milis
    },
    LOGOUT_COOKIE_OPTION: {
        httpOnly: true,
        secure: false,//only for browser
        sameSite: 'lax',
        expires: new Date(0)
    },
    //pagination
    FORMAT_SQL_DATE: "YYYY-MM-DD",
    CREATED_AT: "created_at",
    PAGINATE_PAGE_SIZE: 10,
    //time
    DAYS: "days",
    MONTHS: "months",
    MINUTES: "minutes",
    SECONDS: "seconds",
}
module.exports = Define