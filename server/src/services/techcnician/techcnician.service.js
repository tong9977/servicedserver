// Initializes the `techcnician` service on path `/techcnician`
const createService = require('feathers-objection');
const createModel = require('../../models/techcnician.model');
const hooks = require('./techcnician.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"TechnicianID",
  };

  // Initialize our service with any options it requires
  app.use('/techcnician', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('techcnician');

  service.hooks(hooks);
};
