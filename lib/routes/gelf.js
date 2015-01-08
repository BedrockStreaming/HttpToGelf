module.exports = function(clientGelf, config) {

    var routes = {};

    routes.gelfLog = function(req, res) {
        
        var app = req.params.app;
        var category = req.params.category;

        var msg = {
            short_message: 'message from '+app+' : '+category,
            full_message: 'post req',
            app: app,
            category: category
        }

        // log
        clientGelf.send(msg);

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', 0);
        res.status(201).send('message created');

    };

    return routes;
};
