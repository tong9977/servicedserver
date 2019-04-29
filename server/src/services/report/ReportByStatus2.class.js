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
    //c.Status != "00" && !c.Status.StartsWith("9")
    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').select('TechnicianBelong', 'RequestID','Status');
    var rawTechBelong = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').where('TechnicianBelong' != null).distinct('TechnicianBelong');

    rawTechBelong.forEach(techBelong => {
      var c = {};
      c['ทีมช่าง'] = techBelong.TechnicianBelong;
      var f = rawData.filter(x => x.TechnicianBelong == techBelong.TechnicianBelong);
      c['รวม'] = f.length;
      c['อยู่ระหว่างดำเนินงาน'] = f.filter(x => x.Status == '01' || x.Status == '02' || x.Status == '00').length;
      c['ดำเนินการเรียบร้อย'] = f.filter(x => x.Status == '03' || x.Status == '04').length;

      output.push(c);
    });

    var ct = {};
    ct['ทีมช่าง'] = "รวม";
    ct['รวม'] = rawData.length;
    ct['อยู่ระหว่างดำเนินงาน'] =  rawData.filter(x => x.Status == '01' || x.Status == '02' || x.Status == '00').length;
    ct['ดำเนินการเรียบร้อย'] = rawData.filter(x => x.Status == '03' || x.Status == '04').length;
    output.push(ct);
    
    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
