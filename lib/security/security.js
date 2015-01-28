var md5 = require('MD5');

var Security = function (clients) {
    this.clients = clients;
};

Security.prototype.getToken = function (client, app, category) {

    return md5(app + category + this.clients[client].secretKey);
};

module.exports = function(clients) {
    return new Security(clients);
};
