var md5 = require('MD5');

var Security = function (apps) {
    this.apps = apps;
};

Security.prototype.getToken = function (app, category) {

    return md5(app + category + this.apps[app].secretKey);
};

module.exports = function(apps) {
    return new Security(apps);
};
