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
    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').select('TechnicianBelong', 'RequestID', 'Rate1','Rate2','Rate3', 'RateAvg');
    var rawTechBelong = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').where('TechnicianBelong' != null).distinct('TechnicianBelong');

    rawTechBelong.forEach(techBelong => {
      var c = {};
      c['ทีมช่าง'] = techBelong.TechnicianBelong;
      var f = rawData.filter(x => x.TechnicianBelong == techBelong.TechnicianBelong);
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

      var totalRate1 = f.filter(x => x.Rate1 != null).reduce((temp, item) => {
        return temp + item.Rate1;
      }, 0);
      c['ข้อ 1'] = totalRate1;

      var totalRate2 = f.filter(x => x.Rate2 != null).reduce((temp, item) => {
        return temp + item.Rate2;
      }, 0);
      c['ข้อ 2'] = totalRate2;

      var totalRate3 = f.filter(x => x.Rate3 != null).reduce((temp, item) => {
        return temp + item.Rate3;
      }, 0);
      c['ข้อ 3'] = totalRate3;

      var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);
      c['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

      output.push(c);
    });

    var ct = {};
    ct['ทีมช่าง'] = "รวม";
    ct['ใบงาน'] = rawData.length;
    ct['ประเมิน'] = rawData.filter(x => x.RateAvg != null).length;
    var totalSumRate1 = rawData.filter(x => x.Rate1 != null).reduce((temp, item) => {
      return temp + item.Rate1;
    }, 0);
    ct['ข้อ 1'] = totalSumRate1;
    var rateTotal = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    var totalSumRate2 = rawData.filter(x => x.Rate2 != null).reduce((temp, item) => {
      return temp + item.Rate2;
    }, 0);
    ct['ข้อ 2'] = totalSumRate2;
    var totalSumRate3 = rawData.filter(x => x.Rate3 != null).reduce((temp, item) => {
      return temp + item.Rate3;
    }, 0);
    ct['ข้อ 3'] = totalSumRate3;
    ct['ผลประเมินเฉลี่ย'] = (rateTotal / rawData.filter(x => x.RateAvg != null).length).toFixed(2);
    output.push(ct);

    var rawDataCheckPoint = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').where(x => x.CheckPointID > 0).select('CheckPointName', 'RequestID', 'RateAvg');
    var rawCheckPoint = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').distinct('CheckPointName');


    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
