// Initializes the `request` service on path `/request`
const createService = require('feathers-knex');
const createModel = require('../../models/request.model');
const hooks = require('./request.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tbRequest',
    Model,
    paginate,
    id: "RequestID",
  };

  // Initialize our service with any options it requires
  app.use('/request', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request');

  service.hooks(hooks);
  
  
};
