// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class jobtype extends Model {

  static get tableName() {
    return 'tbJobType';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'JobTypeID';
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
   
  }
}

module.exports = function (app) {
 

  return jobtype;
};
