/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const members = [ 
      {name: "Eve", lastname :"ddd", gender :"m" ,age: 24}, 
      {name: "Adam", lastname :"ddd", gender :"m",age: 48}, 
      {name: "Chris", lastname :"ddd",gender :"f", age: 18}, 
      {name: "Danny", lastname :"ddd",gender :"f", age: 30}
    ]

    var output = {};
    output.males = members.filter(x => x.gender ==='m').map(item => {
      let o = {
        ...item
      }

      delete o.gender
      return o;
    });
    output.females = members.filter(x => x.gender ==='f').map(item => {
      let o ={
        ...item
      }

      delete o.gender
      return o;
    });

    // var output2 = members.reduce((temp, item) => {
    //   if(item.gender === 'm'){
    //     temp.males.push(item);
    //   }
      
    // }, { males : [], females:[] });

    return [output];
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
