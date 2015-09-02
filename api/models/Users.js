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
            required: true
        },
        name: {
            type: 'string',
            required: true
        },
        surname: {
            type: 'string',
            required: false
        },
        country: {
            type: 'string',
            required: false
        },
        city: {
            type: 'string',
            required: false
        },
        gender: {
            type: 'string',
            required: false,
            enum: ['male', 'female']
        },
        birthday: {
            type: 'date',
            required: false
        },
        avatar: {
            type: 'json'
        },
        workDate: {
            type: 'date',
            required: false
        },
        userCV: {
            model : 'Cvs',
            type: 'string',
            unique: false
        },
        userPDP: {
            model : 'Pdps',
            type: 'string',
            unique: false
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
        }
    }
};