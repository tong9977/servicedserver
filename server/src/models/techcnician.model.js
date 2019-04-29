// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class techcnician extends Model {

  static get tableName() {
    return 'tbTechcnician';
  }

   //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'TechnicianID';
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
    
  }
}

module.exports = function (app) {
  return techcnician;
};
