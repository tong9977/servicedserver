const company = require('./company/company.service.js');
const vehicles = require('./vehicles/vehicles.service.js');
const big = require('./big/big.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(company);
  app.configure(vehicles);
  app.configure(big);
};
