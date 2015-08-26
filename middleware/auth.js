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
                cookies.set('serverUID', decoded.id, { httpOnly: false });
                next();
            }
        });
    } else {
        res.cookie('Referer', "http://localhost:1337/");
        res.redirect('http://localhost:2020/');
    }
};