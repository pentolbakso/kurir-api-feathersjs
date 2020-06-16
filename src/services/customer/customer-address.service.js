const { protect } = require("@feathersjs/authentication-local").hooks;

// Initializes the `auth` service on path `/auth`
class CustomerAddressService {
  setup(app) {
    this.app = app;
  }
  async create(data, params) {}
}

module.exports = function (app) {
  app.use("/customer-address", new CustomerAddressService());
  app.service("customer-address").hooks({
    before: {
      all: [],
    },
  });
};
