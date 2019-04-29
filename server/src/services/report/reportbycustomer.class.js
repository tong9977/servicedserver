/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [];
    const request = require('../../models/request.model')();
    //c.Status != "00" && !c.Status.StartsWith("9")
    var rawData = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').where('Status', 'not like', '9%').select('CompanyName', 'RequestID', 'RateAvg');
    var rawCompany = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').where('Status', 'not like', '9%').distinct('CompanyName');

    var rateTotal = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);

    // var s = {};
    // s.Sumary1 = rateTotal;
    // output.push(s);

    rawCompany.forEach(company => {
      var c = {};
      c['หน่วยงาน'] = company.CompanyName;
      var f = rawData.filter(x => x.CompanyName == company.CompanyName)
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

      var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);

      c['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

      output.push(c);
    });

    var ct = {};
    ct['หน่วยงาน'] = "รวม";
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
