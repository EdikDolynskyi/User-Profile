/**
 * Projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        technologies: {
            type: 'array',
            required: true
        },
        screenshots: {
            type: 'array'
        },
        start: {
            type: 'date',
            required: true
        },
        end: {
            type: 'date'
        },
        binary: {
            type: 'boolean',
            defaultsTo: true
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};