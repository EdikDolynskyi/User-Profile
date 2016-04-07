var jsonwebtoken = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = function(req, res, next){
    var cookies = new Cookies(req, res);
    var token = cookies.get('x-access-token');

    if (token) {
        jsonwebtoken.verify(token, 'superpupersecret', function(err, decoded) {
            if (err) {
                res.status(403).send({ success: false, message: "Failed to authenticate user"});
            } else {
                req.decoded = decoded;
                //console.log(decoded);
                cookies.set('serverUID', decoded.id, { httpOnly: false });
                cookies.set('userRole', decoded.role, { httpOnly: false });
                next();
            }
        });
    } else {

        cookies.set('referer',  sails.config.refererURL);
        res.redirect(sails.config.authServerURL);
    }
};