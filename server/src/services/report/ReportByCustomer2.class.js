/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [];

    let prStart = params.query.start;
    let prEnd = params.query.end;

    let start = dateFns.format(prStart, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(prEnd, "YYYY-MM-DDT23:59:59");

    const request = require('../../models/request.model')();
    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').where('RepairBuildingID',119);
    var rawCheckPointName = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', '!=', '00').where('Status', 'not like', '9%').where('RepairBuildingID',119).where('CheckPointID','>', 0).distinct('CheckPointName');

    rawCheckPointName.forEach(checkPoint => {
      var c = {};
      c['Check Point'] = checkPoint.CheckPointName;
      var f = rawData.filter(x => x.CheckPointName == checkPoint.CheckPointName)
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

      var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);

      c['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

      output.push(c);
    });

    var ct = {};
    ct['Check Point'] = "รวม";
    ct['ใบงาน'] = rawData.length;
    ct['ประเมิน'] = rawData.filter(x => x.RateAvg != null).length;
    var rateTotal = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
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
