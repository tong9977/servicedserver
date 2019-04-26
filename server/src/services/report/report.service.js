// Initializes the `report` service on path `/report`
const createService = require('./report.class.js'); //2
const createReportByCustomer = require('./reportbycustomer.class.js'); //1
const createReportByCanal = require('./reportbycanal.class.js'); //3
const createReportByRmGroup = require('./reportbyrmgroup.class.js'); //4

const hooks = require('./report.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report', createService(options));
  app.use('/reportbycustomer', createReportByCustomer(options));
  app.use('/reportbycanal', createReportByCanal(options));
  app.use('/reportbyrmgroup', createReportByRmGroup(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report');

  service.hooks(hooks);
};
