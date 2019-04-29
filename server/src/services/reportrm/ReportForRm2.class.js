/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [];

    let listMonth = [
      {
        monthID: "01",
        monthName: "มกราคม"
      },
      {
        monthID: "02",
        monthName: "กุมภาพันธ์"
      },
      {
        monthID: "03",
        monthName: "มีนาคม"
      },
      {
        monthID: "04",
        monthName: "เมษายน"
      },
      {
        monthID: "05",
        monthName: "พฤษภาคม"
      },
      {
        monthID: "06",
        monthName: "มิถุนายน"
      },
      {
        monthID: "07",
        monthName: "กรกฎาคม"
      },
      {
        monthID: "08",
        monthName: "สิงหาคม"
      },
      {
        monthID: "09",
        monthName: "กันยายน"
      },
      {
        monthID: "10",
        monthName: "ตุลาคม"
      },
      {
        monthID: "11",
        monthName: "พฤศจิกายน"
      },
      {
        monthID: "12",
        monthName: "ธันวาคม"
      }
    ];

    const request = require('../../models/request.model')();
    const zone = require('../../models/zone.model')();
    const checkpointlog = require('../../models/checkpointlog.model')();

    let zoneID = params.query.zone;
    let year = params.query.year;
    let start = dateFns.format(year + "-01-01", "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(year + "-12-31", "YYYY-MM-DDT23:59:59");

    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', 'not like', '9%').where('Status', '!=', '00').where('ZoneID', zoneID);

    for (var i = 0; i < 12; i++) {
      var c = {};
      c['เดือน'] = listMonth[i].monthName;
      let firstDayOfMonth = new Date(year + "-" + listMonth[i].monthID + "-01");
      let lastDayOfMonth = new Date(year, listMonth[i].monthID, 0);
      let f = rawData.filter(x => x.ReqTime >= firstDayOfMonth && x.ReqTime <= lastDayOfMonth);
      c['ใบงาน'] = f.length;
      c['งานหลัก'] = f.filter(x => x.DadJobType == "งานหลัก").length;
      c['งานช่วย'] = f.filter(x => x.DadJobType == "งานช่วย").length;
      c['ไม่ใช่งานในขอบเขต'] = f.filter(x => x.DadJobType == "ไม่ใช่งานในขอบเขต").length;

      output.push(c);
    }

    var ct = {};
    ct['เดือน'] = "รวม";
    ct['ใบงาน'] = rawData.length;
    ct['งานหลัก'] = rawData.filter(x => x.DadJobType == "งานหลัก").length;
    ct['งานช่วย'] = rawData.filter(x => x.DadJobType == "งานช่วย").length;
    ct['ไม่ใช่งานในขอบเขต'] = rawData.filter(x => x.DadJobType == "ไม่ใช่งานในขอบเขต").length;

    output.push(ct);




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
