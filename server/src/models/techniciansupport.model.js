// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class techniciansupport extends Model {

  static get tableName() {
    return 'tbTechnicianSupport';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'SupportID';
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
    
  }
}

module.exports = function (app) {
  return techniciansupport;
};
