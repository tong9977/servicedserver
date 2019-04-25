// Initializes the `servicecustom` service on path `/servicecustom`
const createService = require('./servicecustom.class.js');
const hooks = require('./servicecustom.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/servicecustom', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('servicecustom');

  service.hooks(hooks);
};
