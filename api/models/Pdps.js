/**
 * Pdp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        // position: "string",
        position: {
            model: 'Positions'
        },
        // direction: "string",
        direction: {
            model: 'Directions'
        },
        achievements: "array",
        certification: "array",
        userTasks: "array",
        userTests: "array",
        technologies: "array",
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

