// Initializes the `subdistricts` service on path `/subdistricts`
const { Subdistricts } = require('./subdistricts.class');
const createModel = require('../../models/subdistricts.model');
const hooks = require('./subdistricts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/subdistricts', new Subdistricts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subdistricts');

  service.hooks(hooks);
};
