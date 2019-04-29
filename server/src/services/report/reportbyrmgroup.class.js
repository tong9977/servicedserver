/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    var output = [{
      summary:[],
      data:[]
    }];
    
    const request = require('../../models/request.model')();
    const zone = require('../../models/zone.model')();

    var rawData = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').where('Status', 'not like', '9%').select('ZoneID', 'RequestID', 'Rate1','Rate2','Rate3', 'RateAvg');
    var rawRmGroup =  await zone.query().select('ZoneID', 'ZoneCode');

    rawRmGroup.forEach(rm => {
      var c = {};
      c['RM Group'] = rm.ZoneCode;
      c['เดินตรวจ'] = "0";
      let f = rawData.filter(x => x.ZoneID == rm.ZoneID);
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;
      var totalRate1 = f.filter(x => x.Rate1 != null).reduce((temp, item) => {
        return temp + item.Rate1;
      }, 0);
      c['ข้อ1'] = totalRate1;
      var totalRate2 = f.filter(x => x.Rate2 != null).reduce((temp, item) => {
        return temp + item.Rate2;
      }, 0);
      c['ข้อ2'] = totalRate2;
      var totalRate3 = f.filter(x => x.Rate3 != null).reduce((temp, item) => {
        return temp + item.Rate3;
      }, 0);
      c['ข้อ3'] = totalRate3; 
      var totalRateAvg = f.filter(x => x.RateAvg != null).reduce((temp, item) => {
        return temp + item.RateAvg;
      }, 0);
      c['คะแนนเฉลี่ย'] = (totalRateAvg/f.filter(x => x.RateAvg  != null).length).toFixed(2);

      output[0].data.push(c);
    });

    var ct = {};
    ct['RM Group'] = "รวม";
    ct['เดินตรวจ'] = '0';
    ct['ใบงาน'] =  rawData.length;
    ct['ประเมิน'] = rawData.filter(x => x.RateAvg != null).length;

    var totalSumRate1 = rawData.filter(x => x.Rate1 != null).reduce((temp, item) => {
      return temp + item.Rate1;
    }, 0);
    ct['ข้อ1'] = totalSumRate1;
    var totalSumRate2 = rawData.filter(x => x.Rate2 != null).reduce((temp, item) => {
      return temp + item.Rate2;
    }, 0);
    ct['ข้อ2'] = totalSumRate2;
    var totalSumRate3 = rawData.filter(x => x.Rate3 != null).reduce((temp, item) => {
      return temp + item.Rate3;
    }, 0);
    ct['ข้อ3'] = totalSumRate3;
    var totalSumRateAvg = rawData.filter(x => x.RateAvg != null).reduce((temp, item) => {
      return temp + item.RateAvg;
    }, 0);
    ct['คะแนนเฉลี่ย'] = (totalSumRateAvg/rawData.filter(x => x.RateAvg  != null).length).toFixed(2);
    
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
