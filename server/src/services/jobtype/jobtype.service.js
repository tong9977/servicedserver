// Initializes the `jobtype` service on path `/jobtype`
const createService = require('feathers-objection');
const createModel = require('../../models/jobtype.model');
const hooks = require('./jobtype.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"JobTypeID",
  };

  // Initialize our service with any options it requires
  app.use('/jobtype', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('jobtype');

  service.hooks(hooks);
};
