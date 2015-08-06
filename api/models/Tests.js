/**
* Tests.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
 

module.exports = {

  attributes: {
      testCategory: {
          type: 'string',
          required:true,
          columnName: 'test_category'
      },
//    testCategory: {  
//        collection: 'direction',
//        columnName: 'test_category',     
//        via: '_idDevDirect'
//    },
      testName: {
          type: 'string',
          required:true,
          unique: true,
          columnName: 'test_name'
      },
      testFile: {
          type: 'string',
          required:true,
          columnName: 'test_file'
      }
  }
};

