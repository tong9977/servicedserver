// Initializes the `report` service on path `/report`
const createService1 = require('./ReportByCustomer.class.js'); //1
const createService2 = require('./ReportByCustomer2.class.js'); //1
const createService3 = require('./Report.class.js'); //3
const createService4 = require('./ReportByCanal.class.js'); //4
const createService5 = require('./ReportByRMGroup.class.js'); //5
const createService6 = require('./ReportByTechnicianBelong.class.js'); //6
const createService7 = require('./ReportByTablet.class.js'); //7
const createService8 = require('./ReportByTablet2.class.js'); //8
const createService9 = require('./ReportByStatus.class.js'); //9
const createService10 = require('./ReportByStatus2.class.js'); //10
const createService11 = require('./ReportTop10.class.js'); //10



const hooks = require('./report.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate,
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[jobtype]'
  };

  // Initialize our service with any options it requires
  app.use('/reportbycustomer', createService1(options));
  app.use('/reportbycustomer2', createService2(options));
  app.use('/report', createService3(options));
  app.use('/reportbycanal', createService4(options));
  app.use('/reportbyrmgroup', createService5(options));
  app.use('/reportbytechnicianbelong', createService6(options));
  app.use('/reportbytablet', createService7(options));
  app.use('/reportbytablet2', createService8(options));
  app.use('/reportbystatus', createService9(options));
  app.use('/reportbystatus2', createService10(options));
  app.use('/reporttop10', createService11(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report');

  service.hooks(hooks);
};
