/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [{
      summary:[],
      data:[]
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
    const zone = require('../../models/zone.model')();
    const checkpointlog = require('../../models/checkpointlog.model')();

    let zoneID = params.query.zone;
    let year = params.query.year;
    let start = dateFns.format(year + "-01-01", "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(year + "-12-31", "YYYY-MM-DDT23:59:59");

    var rawData = await checkpointlog.query().where('LogDate', '>=', start).where('LogDate', '<=', end).where('ZoneID', zoneID);
    //List<tbRequest> listRequest = Context.tbRequests.Where(c => c.ReqTime.Year.ToString() == year && c.ZoneID == Convert.ToInt32(zoneID) && c.Status != "00" && !c.Status.StartsWith("9")).ToList();
    var rawDataReq = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('Status', 'not like', '9%').where('Status', '!=', '00').where('ZoneID', zoneID);

    for (var i = 0; i < 12; i++) {
      var c = {};
      c['เดือน'] = listMonth[i].monthName;
      let firstDayOfMonth = new Date(year + "-" + listMonth[i].monthID + "-01");
      let lastDayOfMonth = new Date(year, listMonth[i].monthID, 0);
      let f = rawData.filter(x => x.LogDate >= firstDayOfMonth && x.LogDate <= lastDayOfMonth);
      c['เดินตรวจ(ครั้ง)'] = f.length;
      c['ปกติ'] = f.filter(x => x.LogStatus == 1).length;
      c['เล็กน้อย'] = f.filter(x => x.LogStatus == 2).length;
      c['แจ้งซ่อม'] = f.filter(x => x.LogStatus == 3).length;
      let g = rawDataReq.filter(x => x.ReqTime >= firstDayOfMonth && x.ReqTime <= lastDayOfMonth);
      c['ใบงาน'] = g.length;
      c['ประเมิน'] = g.filter(x => x.RateAvg != null).length;
      var rateTotal = g.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);
      c['ผลประเมินเฉลี่ย'] = (rateTotal / g.filter(x => x.RateAvg != null).length).toFixed(2);

      output[0].data.push(c);
    }

    var ct = {};
    ct['เดือน'] = "รวม";
    ct['เดินตรวจ(ครั้ง)'] = rawData.length;
    ct['ปกติ'] = rawData.filter(x => x.LogStatus == 1).length;
    ct['เล็กน้อย'] = rawData.filter(x => x.LogStatus == 2).length;
    ct['แจ้งซ่อม'] = rawData.filter(x => x.LogStatus == 3).length;

    ct['ใบงาน'] = rawDataReq.length;
    ct['ประเมิน'] = rawDataReq.filter(x => x.RateAvg != null).length;
    var rateSumTotal = rawDataReq.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    ct['ผลประเมินเฉลี่ย'] = (rateSumTotal / rawDataReq.filter(x => x.RateAvg != null).length).toFixed(2);

    output[0].summary.push(ct);

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
