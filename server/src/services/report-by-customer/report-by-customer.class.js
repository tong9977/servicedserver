/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {

    var output = [];
    output.push("Report By Customer");

    const request = require('../../models/request.model')();
    var rawData = await request.query().where('ReqTime', '>=', "2019-04-01").where('ReqTime', '<=', "2019-04-20").select('CompanyName', 'RequestID', 'Status', 'RateAvg');
    var rawCompany = await request.query().where('ReqTime', '>=', "2019-04-01").where('ReqTime', '<=', "2019-04-20").distinct('CompanyName');

    rawCompany.forEach(company => {
      var c = {};
      c['หน่วยงาน'] = company.CompanyName;
      var f = rawData.filter(x => x.CompanyName == company.CompanyName)
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

      var rateTotal = f.filter(x => x.RateAvg != null).reduce(function (prev, cur) {
        return prev + cur.RateAvg;
      }, 0);
      
      var rateTotal2 = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);

      c['ผลประเมินเฉลี่ย'] = rateTotal2 / f.filter(x => x.RateAvg != null).length;
      
      output.push(c);
    });

    return output;
  }



  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
