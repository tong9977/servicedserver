// Initializes the `techniciansupport` service on path `/techniciansupport`
const createService = require('feathers-objection');
const createModel = require('../../models/techniciansupport.model');
const hooks = require('./techniciansupport.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"SupportID",
  };

  // Initialize our service with any options it requires
  app.use('/techniciansupport', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('techniciansupport');

  service.hooks(hooks);
};
