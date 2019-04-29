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

  //Add New Relation
  static get relationMappings() {
    const jobtype = require('./jobtype.model')();

    return {
      jobtype: {
        relation: Model.HasOneRelation,
        modelClass: jobtype,
        join: {
          from: 'tbRequest.JobTypeID',
          to: 'tbJobType.JobTypeID'
        }
      },
    };
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
   
  }
}

module.exports = function (app) {
  
  return jobtype;
};
