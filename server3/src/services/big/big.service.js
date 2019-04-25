// Initializes the `big` service on path `/big`
const createService = require('./big.class.js');
const hooks = require('./big.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/big', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('big');

  service.hooks(hooks);
};
