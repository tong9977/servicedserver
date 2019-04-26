/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [];
    const request = require('../../models/request.model')();
    //c.Status != "00" && !c.Status.StartsWith("9")
    var rawData = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').select('CompanyName', 'RequestID', 'Status', 'RateAvg');
    var rawCompany = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).distinct('CompanyName');

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

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
