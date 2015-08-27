/**
 * User_projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        userId: {
            model : 'Users',
            type: 'string'
        },
        projectId: 'string',
        userRole: 'string',
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }

};