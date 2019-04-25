// Initializes the `reportByCustomer` service on path `/report-by-customer`
const createService = require('./report-by-customer.class.js');
const hooks = require('./report-by-customer.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report-by-customer', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report-by-customer');

  service.hooks(hooks);
};
