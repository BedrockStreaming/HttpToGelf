module.exports = function(clientGelf, config) {

    var routes = {};

    routes.gelfLog = function(req, res) {
        
        var app = req.params.app;
        var category = req.params.category;
        var applicationMessage = req.body;

        if (typeof applicationMessage == 'undefined') {
            res.status(400).end('no application message posted');
        } else {
            var msg = {
                object: 'message from the application '+app+', from category '+category,
                from: config.facility
                payload: JSON.stringify(applicationMessage),
                app: app,
                category: category,
                clientIp: req.ip,
                userAgent: req.headers['user-agent'],
                headers: JSON.stringify(req.headers)
            }

            // add the json posted to the message
            // extend 
            var extend = require('util')._extend
            extend(msg, applicationMessage);

            // log
            clientGelf.send(msg);

            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', 0);
            res.status(201).send('message created');

        }
    };

    return routes;
};
