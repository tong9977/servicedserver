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
    const techtechnicianBelong = require('../../models/technician-belong.model')();
    const techSupport = require('../../models/techniciansupport.model')();


    let technicianID = params.query.technicianid;
    let year = params.query.year;
    
    let start = dateFns.format(year + "-01-01", "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(year + "-12-31", "YYYY-MM-DDT23:59:59");

    var rawDataReq = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', 'not like', '9%').where('Status', '!=', '00');
    var rawDataSupport = await techSupport.query().where('TechnicianID ', technicianID);

    for (var i = 0; i < 12; i++) {
      var c = {};
      c['เดือน'] = listMonth[i].monthName;
      let firstDayOfMonth = new Date(year + "-" + listMonth[i].monthID + "-01");
      let lastDayOfMonth = new Date(year, listMonth[i].monthID, 0);
      let f = rawDataReq.filter(x => x.ReqTime >= firstDayOfMonth && x.ReqTime <= lastDayOfMonth && x.TechnicianMainID == technicianID);
      c['ช่างหลัก'] = f.length;
      let f2 = rawDataReq.filter(x => x.ReqTime >= firstDayOfMonth && x.ReqTime <= lastDayOfMonth);
      let supplyTechnician = 0;
      f2.forEach(element => {
        supplyTechnician += rawDataSupport.filter(x => x.RequestID == element.RequestID && x.TechnicianID == technicianID).length;
      });
      c['ช่างเสริม'] = supplyTechnician;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

      var totalRate1 = f.filter(x => x.Rate1 != null).reduce((temp, item) => {
        return temp + item.Rate1;
      }, 0);
      c['ข้อที่ 1'] = totalRate1;

      var totalRate2 = f.filter(x => x.Rate2 != null).reduce((temp, item) => {
        return temp + item.Rate2;
      }, 0);
      c['ข้อที่ 2'] = totalRate2;

      var totalRate3 = f.filter(x => x.Rate3 != null).reduce((temp, item) => {
        return temp + item.Rate3;
      }, 0);
      c['ข้อที่ 3'] = totalRate3;

      var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);
      c['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

      output[0].data.push(c);
    };

    var ct = {};

    ct['เดือน'] = "รวม";
    let f = rawDataReq.filter(x => x.TechnicianMainID == technicianID);
    ct['ช่างหลัก'] = f.length;
    let f2 = rawDataReq;
    let supplyTechnician = 0;
    f2.forEach(element => {
      supplyTechnician += rawDataSupport.filter(x => x.RequestID == element.RequestID && x.TechnicianID == technicianID).length;
    });
    ct['ช่างเสริม'] = supplyTechnician;
    ct['ประเมิน'] = f.filter(x => x.RateAvg != null).length;

    var totalRate1 = f.filter(x => x.Rate1 != null).reduce((temp, item) => {
      return temp + item.Rate1;
    }, 0);
    ct['ข้อที่ 1'] = totalRate1;

    var totalRate2 = f.filter(x => x.Rate2 != null).reduce((temp, item) => {
      return temp + item.Rate2;
    }, 0);
    ct['ข้อที่ 2'] = totalRate2;

    var totalRate3 = f.filter(x => x.Rate3 != null).reduce((temp, item) => {
      return temp + item.Rate3;
    }, 0);
    ct['ข้อที่ 3'] = totalRate3;

    var rateTotal = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    ct['ผลประเมินเฉลี่ย'] = (rateTotal / f.filter(x => x.RateAvg != null).length).toFixed(2);

    output[0].summary.push(ct);

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
