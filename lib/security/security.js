var md5 = require('MD5');

var Security = function (secretKey) {
    this._secretKey = secretKey;

};

Security.prototype.getToken = function (app, category) {

    return md5(app + category + this._secretKey);
};

module.exports = function(secretKey) {
    return new Security(secretKey);
};
