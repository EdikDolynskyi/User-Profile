/**
 * Technology.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        name: {
            type: 'string',
            unique: true
        },
        category: {
            model : 'Categories',
            type: 'string'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};
