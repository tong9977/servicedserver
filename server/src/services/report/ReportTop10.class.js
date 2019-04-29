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

    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').select('RequestID','JobTypeID','JobTypeDescription');
    var rawDataJobTypeID = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').distinct('JobTypeID');
    var rawDataJobTypeName = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').distinct('JobTypeID','JobTypeDescription');

    rawDataJobTypeID.forEach(jobType => {
      var c = {};
      c['ลำดับ'] = 0;
      c['หัวข้อเรื่องแจ้งซ่อมหลัก'] = rawDataJobTypeName.filter(x => x.JobTypeID == jobType.JobTypeID);
      c['จำนวน'] = rawData.filter(x => x.JobTypeID == jobType.JobTypeID).length;
      c['ร้อยละ'] = 0;

      output.push(c);
    });

    var ct = {};

    output.push(ct);

    return output.sort(function(b, a){return b-a});;
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
