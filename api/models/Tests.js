/**
 * Tests.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {
    connection: 'mongo',
    attributes: {
        category: {
            type: 'string',
            required: true,
            columnName: 'test_category'
        },
        name: {
            type: 'string',
            required: true,
            unique: true,
            columnName: 'test_name'
        },
        file: {
            type: 'string',
            required: true,
            columnName: 'test_file'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

