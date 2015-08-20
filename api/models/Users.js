/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {
    connection: 'mongo',
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        name: {
            type: 'string',
            required: true
        },
        surname: {
            type: 'string',
            required: true
        },
        country: {
            type: 'string',
            required: true
        },
        city: {
            type: 'string',
            required: true
        },
        gender: {
            type: 'string',
            required: true,
            enum: ['male', 'female']
        },
        birthday: {
            type: 'date',
            required: true
        },
        avatar: {
            type: 'json'
        },
        userCV: {
            model : 'Cvs',
            type: 'string',
            unique: true
        },
        userPDP: {
            model : 'Pdps',
            type: 'string',
            unique: true
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        },
        changeAccept: {
            type: 'boolean',
            defaultsTo: true
        },
        preModeration: {
            type: 'json'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function (user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};