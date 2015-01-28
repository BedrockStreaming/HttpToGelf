var SecurityTokenChecker = function(security, options) {

    if (!options || typeof options === "undefined") {
        options = {};
    }

    return function middleware (req, res, next) {

        var token = false;

        if (typeof req.query.token != 'undefined') {
            token = req.query.token;
        }
        if (typeof security.config.clients[req.params.client] == 'undefined') {
            res.status(404).end('undefined client : '+req.params.client);
        } else if (token == security.getToken(req.params.client, req.params.app,req.params.category)) {
            next();
        } else {
            res.status(400).end('no token or invalid provided ');
        }
    };
};

module.exports = SecurityTokenChecker;
