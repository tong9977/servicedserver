// Initializes the `reporttechnicianbelongperson` service on path `/reporttechnicianbelongperson`
const createService = require('./reporttechnicianbelongperson.class.js');
const createService1 = require('./ReportTechnicianBelongPerson1.class.js');
const hooks = require('./reporttechnicianbelongperson.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/reporttechnicianbelongperson', createService(options));
  app.use('/reporttechnicianbelongperson1', createService1(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('reporttechnicianbelongperson');

  service.hooks(hooks);
};
