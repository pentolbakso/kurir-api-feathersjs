// Initializes the `villages` service on path `/villages`
const { Villages } = require('./villages.class');
const createModel = require('../../models/villages.model');
const hooks = require('./villages.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/villages', new Villages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('villages');

  service.hooks(hooks);
};
