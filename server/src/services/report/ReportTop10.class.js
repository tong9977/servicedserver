/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    let prStart = params.query.start;
    let prEnd = params.query.end;

    let start = dateFns.format(prStart, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(prEnd, "YYYY-MM-DDT23:59:59");

    var output = [];
    const request = require('../../models/request.model')();
    const jobTypeModel = require('../../models/jobtype.model')();

    var rawData = await request.query().eager('jobtype').where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%');
    var rawJobTypeGroup = await jobTypeModel.query().where('JobTypeGroupName', '!=', 'null').distinct('JobTypeGroupName');
   
    rawJobTypeGroup.forEach(groupName => {
      var c = {};
      c['ลำดับ'] = 0;
      c['หัวข้อเรื่องแจ้งซ่อมหลัก'] = groupName;
      c['จำนวน'] = rawData.filter(x => { 
        return x.jobtype.JobTypeGroupName == groupName 
      });
      c['ร้อยละ'] = 0;

      output.push(c);
    });

    var ct = {};

    output.push(ct);

    return output;
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
