const company = require('./company/company.service.js');
const zone = require('./zone/zone.service.js');
const technicianbelong = require('./technician-belong/technician-belong.service.js');
const request = require('./request/request.service.js');
const report = require('./report/report.service.js');
const reportrm = require('./reportrm/reportrm.service.js');

const reporttechnicianbelong = require('./reporttechnicianbelong/reporttechnicianbelong.service.js');

const reporttechnicianbelongperson = require('./reporttechnicianbelongperson/reporttechnicianbelongperson.service.js');

const techcnician = require('./techcnician/techcnician.service.js');

const techniciansupport = require('./techniciansupport/techniciansupport.service.js');

const jobtype = require('./jobtype/jobtype.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(company);
  app.configure(zone);
  app.configure(technicianbelong);
  app.configure(request);
  app.configure(report);
  app.configure(reportrm);
  app.configure(reporttechnicianbelong);
  app.configure(reporttechnicianbelongperson);
  app.configure(techcnician);
  app.configure(techniciansupport);
  app.configure(jobtype);
};
