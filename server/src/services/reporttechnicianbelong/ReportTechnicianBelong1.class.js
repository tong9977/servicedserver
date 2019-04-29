/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [{
      summary:[],
      data:[],
      technicianteam:[],
    }];

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
    const technician = require('../../models/techcnician.model')();

    let technicianbelong = params.query.technicianbelong;
    let year = params.query.year;
    let start = dateFns.format(year + "-01-01", "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(year + "-12-31", "YYYY-MM-DDT23:59:59");

    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', 'not like', '9%').where('Status', '!=', '00').where('TechnicianBelong', technicianbelong);
    var rawDataTechnicians =  await technician.query().where('Belong', technicianbelong);

    for (var i = 0; i < 12; i++) {
      var c = {};
      c['เดือน'] = listMonth[i].monthName;
      let firstDayOfMonth = new Date(year + "-" + listMonth[i].monthID + "-01");
      let lastDayOfMonth = new Date(year, listMonth[i].monthID, 0);
      let f = rawData.filter(x => x.ReqTime >= firstDayOfMonth && x.ReqTime <= lastDayOfMonth);
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;
      var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);
      c['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

      output[0].data.push(c);
    };

    let ct = {};

    ct['เดือน'] = "รวม";
    ct['ใบงาน'] = rawData.length;
    ct['ประเมิน'] = rawData.filter(x => x.RateAvg != null).length;
    var rateSumTotal = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    ct['ผลประเมินเฉลี่ย'] = (rateSumTotal / rawData.filter(x => x.RateAvg != null).length).toFixed(2);

    output[0].summary.push(ct);

    rawDataTechnicians.forEach(tech => {
      var team = {};
      team.ID = tech.TechnicianID;
      team.FullName = tech.FullName;
      output[0].technicianteam.push(team);
    });
   
    

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
