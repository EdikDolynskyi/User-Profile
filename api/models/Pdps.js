/**
 * Pdp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    connection: 'mongo',
    attributes: {
        position: {
            model: 'Positions',
            type: 'string'
        },
        direction: {
            model: 'Directions'
        },
        achievements: "array",
        certifications: "array",
        tasks: "array",
        tests: "array",
        technologies: "array",
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

