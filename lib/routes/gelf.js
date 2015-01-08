module.exports = function(clientGelf, config) {

    var routes = {};

    routes.gelfLog = function(req, res) {
        
        // log
        // access the post. 
        clientGelf.send({ short_message: 'test'})

        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', 0);
        res.status(201).send('');

    };

    return routes;
};
