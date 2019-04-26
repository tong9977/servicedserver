/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    var output = [];
    
    const request = require('../../models/request.model')();
    const zone = require('../../models/zone.model')();

    var rawData = await request.query().where('ReqTime', '>=', params.query.start).where('ReqTime', '<=', params.query.end).where('Status', '!=', '00').select('ZoneID', 'RequestID', 'Rate1','Rate2','Rate3', 'RateAvg');
    var rawRmGroup =  await zone.query().select('ZoneID', 'ZoneCode');

    rawRmGroup.forEach(rm => {
      var c = {};
      c['RM Group'] = rm.ZoneCode;
      c['เดินตรวจ'] = "0";
      let f = rawData.filter(x => x.ZoneID == rm.ZoneID);
      c['ใบงาน'] = f.length;
      c['ประเมิน'] = f.filter(x => x.RateAvg != null).length;
      c['ข้อ 1'] = f.filter(x => x.Rate1 != null).length;
      c['ข้อ 2'] = f.filter(x => x.Rate2 != null).length;
      c['ข้อ 3'] = f.filter(x => x.Rate3 != null).length;
      c['คะแนนเฉลี่ย'] = f.filter(x => x.Rate3 != null).length;
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
