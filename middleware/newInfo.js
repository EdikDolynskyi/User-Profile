var jsonwebtoken = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = function(req, res, next){
    var cookies = new Cookies(req, res);
    var token = cookies.get('newInfo');

    if (token) {
        jsonwebtoken.verify(token, 'superpupersecret', function(err, decoded) {
            if (err) {
                res.status(403).send({ success: false, message: "Wrong user data"});
            } else {
                req.decoded = decoded;
                cookies.set('newUserId', decoded.id, { httpOnly: false });
                cookies.set('newUserEmail', decoded.email, { httpOnly: false });
                res.clearCookie('newInfo');
                res.redirect(sails.config.createUserURL);
                next();
            }
        });
    } else {

         //cookies.set('referer',  sails.config.refererURL);
         //res.redirect(sails.config.authServerURL);
        next();
    }
};  