/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
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
    //predicateREQ = predicateREQ.And(c => c.ReqTime.Year.ToString() == year && c.Status != "00" && !c.Status.StartsWith("9"));
    var rawData = await request.query().where('Status', '!=', '00').where('Status', 'not like', '9%').where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).select('RequestID', 'ReqTime', 'RequestChannel');

    for(var i = 0; i < 12; i++){
      var c = {};
      c['เดือน'] = listMonth[i].monthName;
      var f = rawData.filter(x => x.ReqTime.getMonth() == i);
      c['ใบงาน'] = f.length;
      c['เว็บ'] = f.filter(x => x.RequestChannel != 'W').length;
      c['CallCenter'] = f.filter(x => x.RequestChannel != 'C').length;
      c['RM'] = f.filter(x => x.RequestChannel != 'R').length;
      c['Tablet'] = f.filter(x => x.RequestChannel != 'A').length;
      
      output[0].data.push(c);
    };

    var ct = {};
    ct['เดือน'] = "รวม";
    ct['ใบงาน'] = rawData.length;
    ct['เว็บ'] = rawData.filter(x => x.RequestChannel != 'W').length;
    ct['CallCenter'] = rawData.filter(x => x.RequestChannel != 'C').length;
    ct['RM'] = rawData.filter(x => x.RequestChannel != 'R').length;
    ct['Tablet'] = rawData.filter(x => x.RequestChannel != 'A').length;
    output[0].summary.push(ct);

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
