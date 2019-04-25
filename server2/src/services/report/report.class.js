/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const company = require('../../models/company.model')();
    const joblog = require('../../models/joblog.model')();
    const request = require('../../models/request.model')();

    var x = await company.query();
    var y = await request.query().findById(19040100).eager("company(getCompanyName)",{
      getCompanyName(builder) {
        builder.select('CompanyName')
      }
    });

    //Context.tbRequests.Where(c => c.ReqTime.Year.ToString() == year && c.ZoneID == Convert.ToInt32(zoneID) && c.Status != "00" && !c.Status.StartsWith("9")).ToList();
    var rawData = await request.query().where('ReqTime','>=', params.query.start).where('ReqTime','<=', params.query.end).select('CompanyName','RequestID','DadJobType');
    var rawCompany = await request.query().where('ReqTime','>=', params.query.start).where('ReqTime','<=', params.query.end).distinct('CompanyName');

    //Test map
    let res = rawData.map(item => item.RequestID)
    console.table(res);


    var output = [];
    rawCompany.forEach(company => {
      var c = {};
      c['หน่วยงาน'] = company.CompanyName;
      var f = rawData.filter(x => x.CompanyName == company.CompanyName)
      c['ทั้งหมด'] = f.length;
      c['งานหลัก'] = f.filter(x => x.DadJobType == "งานหลัก").length;
      c['งานช่วย'] = f.filter(x => x.DadJobType == "งานช่วย").length;
      c['ไม่ใช่งานในขอบเขต'] =  f.filter(x => x.DadJobType == "ไม่ใช่งานในขอบเขต").length;
      output.push(c);
    });

    return output;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
