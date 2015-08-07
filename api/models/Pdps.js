/**
 * Pdp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        position: "string",
        direction: "string",
        achievement: "array",
        certification: "array",
        userTasks: "array",
        userTests: "array",
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

