// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class joblog extends Model {

  static get tableName() {
    return 'tbJobLog';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'JobLogID';
  }

  //Add New 
  static get virtualAttributes() {
    return [];
  }

  //Add New คือ select มาเฉพาะคอร์ลัม ใส่ (defaultSelects)
  //http://localhost:3030/request/19040100?$eager=[company(getCompanyName)]
  static get modifiers() {
    return {
      getJobLogDescription(builder) {
        builder.select('JobLogDescription')
      },
    };
  }

  $beforeInsert() {

  }

  $beforeUpdate() {

  }
}

module.exports = function (app) {

  return joblog;
};
