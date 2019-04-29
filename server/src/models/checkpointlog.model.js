// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class checkpointlog extends Model {

  static get tableName() {
    return 'tbCheckPointLog';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'CheckPoinrLogID';
  }

  $beforeInsert() {

  }

  $beforeUpdate() {

  }
}

module.exports = function (app) {
  return checkpointlog;
};
