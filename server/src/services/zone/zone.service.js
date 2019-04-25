// Initializes the `zone` service on path `/zone`
const createService = require('feathers-objection');
const createModel = require('../../models/zone.model');
const hooks = require('./zone.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"ZoneID",
  };

  // Initialize our service with any options it requires
  app.use('/zone', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('zone');

  service.hooks(hooks);
};
