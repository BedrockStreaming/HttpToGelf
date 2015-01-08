#!/usr/bin/env node

var config = require('config').config;

console.log(config);

var security = require('./lib/security/security.js')(config.secretKey),
    middleware = require('./lib/middleware.js');
    express = require('express');

var app = express();
var gelfling = require('gelfling');

var clientGelf = gelfling(config.host, config.port, {
  defaults: {
    	facility: config.facility,
    	level: gelfling.INFO
	}
})

var gelfRouting = require('./lib/routes/gelf.js')(clientGelf, config);

app.post('/gelf/log/:app/:category', middleware.securityToken(security), gelfRouting.gelfLog);


app.get('/status', function (req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).end('OK');
});


var port = process.env.NODE_PORT || config.port;

app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+' in '+app.settings.env+' mode');