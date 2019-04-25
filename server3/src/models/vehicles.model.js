// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class vehicles extends Model {

  static get tableName() {
    return 'vehicles';
  }

    //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
    static get idColumn() {
      return 'VehicleId';
    }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  
  return vehicles;
};
