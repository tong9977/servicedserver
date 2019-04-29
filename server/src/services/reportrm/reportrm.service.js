// Initializes the `reportrm` service on path `/reportrm`
const createService = require('./reportrm.class.js');
const createService1 = require('./ReportForRm1.class.js'); //1
const createService2 = require('./ReportForRm2.class.js'); //2
const hooks = require('./reportrm.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/reportrm', createService(options));
  app.use('/reportforrm1', createService1(options));
  app.use('/reportforrm2', createService2(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('reportrm');

  service.hooks(hooks);
};
