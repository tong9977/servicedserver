const users = require('./users/users.service.js');
const request = require('./request/request.service.js');
const company = require('./company/company.service.js');
const zone = require('./zone/zone.service.js');
const technicianBelong = require('./technician-belong/technician-belong.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(request);
  app.configure(company);
  app.configure(zone);
  app.configure(technicianBelong);
};
