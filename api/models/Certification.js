/**
* Certification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'mongo',
  attributes: {
  	certifName: {type: 'string', unique: true, required: true},
  	img: 		{type: 'string'},
  	score: 		{type: 'float'},
  	isDeleted: 	{type: 'boolean', required: true, defaultsTo: false}
  }
};