const request = require('./request/request.service.js');
const company = require('./company/company.service.js');
const joblog = require('./joblog/joblog.service.js');
const report = require('./report/report.service.js');
const zone = require('./zone/zone.service.js');
const technicianBelong = require('./technician-belong/technician-belong.service.js');
const reportByCustomer = require('./report-by-customer/report-by-customer.service.js');
const servicecustom = require('./servicecustom/servicecustom.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(request);
  app.configure(company);
  app.configure(joblog);
  app.configure(report);
  app.configure(zone);
  app.configure(technicianBelong);
  app.configure(reportByCustomer);
  app.configure(servicecustom);
};
