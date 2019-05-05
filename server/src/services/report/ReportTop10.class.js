/* eslint-disable no-unused-vars */
const collect = require('collect.js');
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let prStart = params.query.start;
    let prEnd = params.query.end;

    let start = dateFns.format(prStart, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(prEnd, "YYYY-MM-DDT23:59:59");

    var output = [{
      summary:[],
      data:[]
    }];
    let outputLastUpdate = [];

    const request = require('../../models/request.model')();
    const jobTypeModel = require('../../models/jobtype.model')();

    let rawData = await request.query().eager('jobtype').where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%');
    let rawJobTypeGroup = await jobTypeModel.query().where('JobTypeGroupName', '!=', 'null').distinct('JobTypeGroupName');
    let rawDataNew = [];

    rawData.forEach(d => {
      d.jobtype.forEach(jt => {
        d.JobTypeGroupName = jt.JobTypeGroupName;
      });
      delete d.jobtype;
      rawDataNew.push(d);
    });

    let rawOutput = [];
    rawJobTypeGroup.forEach(groupName => {
      let c = {};
      c['ลำดับ'] = 0;
      c['หัวข้อเรื่องแจ้งซ่อมหลัก'] = groupName.JobTypeGroupName;
      c['จำนวน'] = rawDataNew.filter(x => x.JobTypeGroupName == groupName.JobTypeGroupName).length;
      c['ร้อยละ'] = 0;

      rawOutput.push(c);
    });

    outputLastUpdate = rawOutput.sort(function(a, b){return b.จำนวน-a.จำนวน});

    const collection = collect(outputLastUpdate);
    let outpuTake10 = collection.take(10);
    outpuTake10.all();

    const collection2 = collect(outpuTake10);
    let sum = collection2.sum('จำนวน');

    let i = 1;
    outpuTake10.items.forEach(element => {
      let c = {};
      c['ลำดับ'] =  i;
      c['หัวข้อเรื่องแจ้งซ่อมหลัก'] = element.หัวข้อเรื่องแจ้งซ่อมหลัก;
      c['จำนวน'] =  element.จำนวน;
      c['ร้อยละ'] =  ((element.จำนวน/sum) * 100).toFixed(2);

      output[0].data.push(c);
      i++;
    });

    return output;
  }

}

function compare( a, b ) {
  if ( a.last_nom < b.last_nom ){
    return -1;
  }
  if ( a.last_nom > b.last_nom ){
    return 1;
  }
  return 0;
}



module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
