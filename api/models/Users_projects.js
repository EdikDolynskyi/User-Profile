/**
 * User_projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        user: 'string',
        project: 'string',
        userRole: 'string',
        start: 'date',
        end: 'date',
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};