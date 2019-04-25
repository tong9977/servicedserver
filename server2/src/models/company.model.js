// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class company extends Model {

  static get tableName() {
    return 'tbCompany';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'CompanyID';
  }

  //Add New 
  static get virtualAttributes() {
    return [];
  }

  //Add New คือ select มาเฉพาะคอร์ลัม ใส่ (defaultSelects)
  //http://localhost:3030/request/19040100?$eager=[company(getCompanyName)]
  static get modifiers() {
    return {
      getCompanyName(builder) {
        builder.select('CompanyName')
      },

      orderByAge(builder) {
        builder.orderBy('CompanyID');
      }
    };
  }

  $beforeInsert() {

  }

  $beforeUpdate() {

  }
}

module.exports = function (app) {

  return company;
};
