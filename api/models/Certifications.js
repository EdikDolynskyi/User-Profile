/**
 * Certifications.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        name: {type: 'string', unique: true, required: true},
        src: 'string',
        score: 'float',
        category: {
            model: 'Categories'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};