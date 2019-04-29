/* eslint-disable no-unused-vars */

const dateFns = require('date-fns');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    var output = [{
      summary:[],
      data:[]
    }];

    let prStart = params.query.start;
    let prEnd = params.query.end;

    let start = dateFns.format(prStart, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(prEnd, "YYYY-MM-DDT23:59:59");

    const request = require('../../models/request.model')();
    var rawData = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('RequestChannel', 'A').select('RequestID','JobTypeID','CheckPointID','CheckPointName');

    var rawDataCheckPoint = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('RequestChannel', 'A').select('CheckPointID','CheckPointName');
    var rawDataCheckPointID = await request.query().where('ReqTime', '>=', start).where('ReqTime', '<=', end).where('RequestChannel', 'A').distinct('CheckPointID');

    rawDataCheckPointID.forEach(checkPoint => {
      var c = {};
      c['Check Point'] = rawDataCheckPoint.filter(x => x.CheckPointID == checkPoint.CheckPointID)[0].CheckPointName;
      var f = rawData.filter(x => x.CheckPointID == checkPoint.CheckPointID);
      c['ไฟกระพริบ/ไม่ติด'] = f.filter(x => x.JobTypeID == 246).length;
      c['น้ำไหลไม่หยุด/ไม่ไหล'] = f.filter(x => x.JobTypeID == 202).length;
      c['อุปกรณ์อื่นๆชำรุด'] = f.filter(x => x.JobTypeID == 297).length;
      c['กระดาษชำระ'] = f.filter(x => x.JobTypeID == 16).length;;
      c['สบู่เหลวล้างมือ'] = f.filter(x => x.JobTypeID == 17).length;;
      c['แอลกอฮอล์เช็ดฝารองนั่ง'] = f.filter(x => x.JobTypeID == 298).length;;
      c['พื้น/ฝาผนังสกปรก'] = f.filter(x => x.JobTypeID == 2).length;;
      c['ห้องน้ำมีกลิ่นเหม็น'] = f.filter(x => x.JobTypeID == 166).length;;
      c['ถังขยะเต็ม'] = f.filter(x => x.JobTypeID == 299).length;;
      c['มีแมลง/สัตว์รบกวน'] = f.filter(x => x.JobTypeID == 26).length;;

      output[0].data.push(c);
    });

    var ct = {};

    output[0].summary.push(ct);

    return output;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
