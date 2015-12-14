/**
* AchievementCategories.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'mongo',
  attributes: {
  	achievements: {
        collection: "achievements",
        via: "category"
    },
  	name: {
  		type: "string",
  		unique: true
  	},
    isDeleted: {
        type: 'boolean',
        defaultsTo: false
    }
  }
};

