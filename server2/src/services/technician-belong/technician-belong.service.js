// Initializes the `technicianBelong` service on path `/technician-belong`
const createService = require('feathers-objection');
const createModel = require('../../models/technician-belong.model');
const hooks = require('./technician-belong.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:"TechnicianBelongID",
  };

  // Initialize our service with any options it requires
  app.use('/technician-belong', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('technician-belong');

  service.hooks(hooks);
};
