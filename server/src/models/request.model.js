// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class request extends Model {

  static get tableName() {
    return 'tbRequest';
  }

  //Add New ใส่ชื่อคอร์ลัมที่เป็น pk
  static get idColumn() {
    return 'RequestID';
  }

  //Add New สำหรับคำนวณ ตัวอย่าง function ชื่อ total ผลลัพธ์ได้ column total
  static get virtualAttributes() {
    return ['sumJob', 'sumMainJob', 'sumHelpJob', 'sumOther'];
  }

  //Add New Relation
  static get relationMappings() {
    const company = require('./company.model')();
    const joblog = require('./joblog.model')();
    const jobtype = require('./jobtype.model')();

    return {
      company: {
        relation: Model.HasOneRelation,
        modelClass: company,
        join: {
          from: 'tbRequest.CompanyID',
          to: 'tbCompany.CompanyID'
        }
      },
      joblogs: {
        relation: Model.HasManyRelation,
        modelClass: joblog,
        join: {
          from: 'tbRequest.RequestID',
          to: 'tbJobLog.RequestID'
        }
      },
      jobtype:{
        relation: Model.HasManyRelation,
        modelClass: jobtype,
        join: {
          from: 'tbRequest.JobTypeID',
          to: 'tbJobType.JobTypeID'
        }
      }
    };
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
    
  }
}

module.exports = function (app) {

  return request;
};
