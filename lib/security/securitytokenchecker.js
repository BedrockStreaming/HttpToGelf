var SecurityTokenChecker = function(security, options) {

    if (!options || typeof options === "undefined") {
        options = {};
    }

    return function middleware (req, res, next) {

        var token = false;
        var querystring = require('querystring');

        if (typeof req.query.token != 'undefined') {
            token = req.query.token;
        }
        if (typeof security.apps[req.params.app] == 'undefined') {
            res.status(404).end('undefined app : '+querystring.escape(req.params.app));
        } else if (token == security.getToken(req.params.app,req.params.category)) {
            next();
        } else {
            res.status(400).end('no token or invalid provided ');
        }
    };
};

module.exports = SecurityTokenChecker;
