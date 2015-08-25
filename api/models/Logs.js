/**
 * Logs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'mongo',
    attributes: {
        userId: {
            type: 'string'
        },
        owner: {
            type: 'array'
        },
        original: {
            type: 'array'
        },
        changes: {
            type: 'array'
        },
        date: {
            type: 'array'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};
