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

    const company = require('../../models/company.model')();
    const joblog = require('../../models/joblog.model')();
    const request = require('../../models/request.model')();

    //Example
    var x = await company.query();
    var y = await request.query().findById(19040100).eager("company(getCompanyName)",{
      getCompanyName(builder) {
        builder.select('CompanyName')
      }
    });

    //Context.tbRequests.Where(c => c.ReqTime.Year.ToString() == year && c.ZoneID == Convert.ToInt32(zoneID) && c.Status != "00" && !c.Status.StartsWith("9")).ToList();
    var rawData = await request.query().where('ReqTime','>=', start).where('Status', '!=', '00').where('ReqTime','<=', end).where('Status', 'not like', '9%').select('CompanyName','RequestID','DadJobType');
    var rawCompany = await request.query().where('ReqTime','>=', start).where('Status', '!=', '00').where('ReqTime','<=', end).where('Status', 'not like', '9%').distinct('CompanyName');

    //Test map
    let res = rawData.map(item => item.RequestID)
    console.table(res);


    var output = [{
      summary:[],
      data:[]
    }];
    rawCompany.forEach(company => {
      var c = {};
      c['หน่วยงาน'] = company.CompanyName;
      var f = rawData.filter(x => x.CompanyName == company.CompanyName)
      c['ทั้งหมด'] = f.length;
      c['งานหลัก'] = f.filter(x => x.DadJobType == "งานหลัก").length;
      c['งานช่วย'] = f.filter(x => x.DadJobType == "งานช่วย").length;
      c['ไม่ใช่งานในขอบเขต'] =  f.filter(x => x.DadJobType == "ไม่ใช่งานในขอบเขต").length;
      output[0].data.push(c);
    });

    var ct = {};
    ct['หน่วยงาน'] = "รวม";
    ct['ทั้งหมด'] = rawData.length;
    ct['งานหลัก'] = rawData.filter(x => x.DadJobType == "งานหลัก").length;
    ct['งานช่วย'] = rawData.filter(x => x.DadJobType == "งานช่วย").length;
    ct['ไม่ใช่งานในขอบเขต'] = rawData.filter(x => x.DadJobType == "ไม่ใช่งานในขอบเขต").length;
    output[0].summary.push(ct);

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
