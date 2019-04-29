/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [{
      summary:[],
      data:[]
    }];

    let prStart = params.query.start;
    let prEnd = params.query.end;

    let start = dateFns.format(prStart, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(prEnd, "YYYY-MM-DDT23:59:59");

    const request = require('../../models/request.model')();
    const zone = require('../../models/zone.model')();

    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').where('Status','!=','').select('RequestID','ZoneID','Status');
    var rawRmGroup =  await zone.query().select('ZoneID', 'ZoneCode');

    rawRmGroup.forEach(rm => {
      var c = {};
      c['RM Group'] = rm.ZoneCode;
      let f = rawData.filter(x => x.ZoneID == rm.ZoneID);
      c['รวม'] = f.length;
      c['อยู่ระหว่างดำเนินงาน'] = f.filter(x => x.Status == '01' || x.Status == '02' || x.Status == '00').length;
      c['ดำเนินการเรียบร้อย'] = f.filter(x => x.Status == '03' || x.Status == '04').length;

      output[0].data.push(c);
    });

    var ct = {};
    ct['RM Group'] = "รวม";
    ct['รวม'] = rawData.length;
    ct['อยู่ระหว่างดำเนินงาน'] =  rawData.filter(x => x.Status == '01' || x.Status == '02' || x.Status == '00').length;
    ct['ดำเนินการเรียบร้อย'] = rawData.filter(x => x.Status == '03' || x.Status == '04').length;

    output[0].summary.push(ct);

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
