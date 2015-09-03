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
        owner: {
            type: 'string'
            
        },
        description: {
            type: 'string',
            required: true,
        },
        technologies: {
            type: 'array',
            required: true,
        },
        screenshots: 'array',
        start: 'date',
        end: 'date',
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};