// Initializes the `reporttechnicianbelong` service on path `/reporttechnicianbelong`
const createService = require('./reporttechnicianbelong.class.js');
const createService1 = require('./ReportTechnicianBelong1.class.js');
const hooks = require('./reporttechnicianbelong.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/reporttechnicianbelong', createService(options));
  app.use('/reporttechnicianbelong1', createService1(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('reporttechnicianbelong');

  service.hooks(hooks);
};
