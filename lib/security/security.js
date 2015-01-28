var md5 = require('MD5');

var Security = function (config) {
    this.config = config;
};

Security.prototype.getToken = function (client, app, category) {

    return md5(app + category + this.config.clients[client].secretKey);
};

module.exports = function(config) {
    return new Security(config);
};
