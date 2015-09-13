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
            type: 'string',
            required: false
        },
        technologies: {
            type: 'array',
            required: true
        },
        screenshots: 'array',
        start: {
            type: 'date',
            required: true
        },
        end: {
            type: 'date',
            required: false
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};