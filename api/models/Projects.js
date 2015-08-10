/**
 * Projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        name: 'string',
        owner: 'string',
        description: 'string',
        technologies: 'array',
        screenshots: 'array',
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};