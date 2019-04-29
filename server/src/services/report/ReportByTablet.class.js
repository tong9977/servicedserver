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
    const infromRate = require('../../models/informrate.model')();
    var rawDataReq = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('RequestChannel', 'A').select('RequestID','CheckPointID');
    var rawData = await infromRate.query().where('CreateDate', '>=', start).where('CreateDate', '<=', end).select('CheckPointID','CheckPointName', 'Rate1','Rate2','Rate3', 'RateAvg');
    var rawDataCheckPoint = await infromRate.query().where('CreateDate', '>=', start).where('CreateDate', '<=', end).distinct('CheckPointID','CheckPointName');

    rawDataCheckPoint.forEach(checkPoint => {
      var c = {};
      c['Check Point'] = checkPoint.CheckPointName;
      var f = rawData.filter(x => x.CheckPointID == checkPoint.CheckPointID);
      c['ใบงาน'] = rawDataReq.filter(x => x.CheckPointID === checkPoint.CheckPointID).length;
      c['ประเมิน'] = f.length;

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

    ct['Check Point'] = "รวม";
    ct['ใบงาน'] = rawDataReq.length;
    ct['ประเมิน'] = rawData.length;

    var totalSumRate1 = rawData.filter(x => x.Rate1 != null).reduce((temp, item) => {
      return temp + item.Rate1;
    }, 0);
    ct['ข้อ 1'] = totalSumRate1;
    var totalSumRate2 = rawData.filter(x => x.Rate2 != null).reduce((temp, item) => {
      return temp + item.Rate2;
    }, 0);
    ct['ข้อ 2'] = totalSumRate2;
    var totalSumRate3 = rawData.filter(x => x.Rate3 != null).reduce((temp, item) => {
      return temp + item.Rate3;
    }, 0);
    ct['ข้อ 3'] = totalSumRate3;
    var totalSumRateAvg = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    ct['คะแนนเฉลี่ย'] = (totalSumRateAvg/rawData.filter(x => x.RateAvg  != null).length).toFixed(2);

    output.push(ct);

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
