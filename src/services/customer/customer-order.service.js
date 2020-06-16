const { protect } = require("@feathersjs/authentication-local").hooks;

// Initializes the `auth` service on path `/auth`
class CustomerOrderService {
  setup(app) {
    this.app = app;
  }
  async create(data, params) {}
}

module.exports = function (app) {
  app.use("/customer-order", new CustomerOrderService());
  app.service("customer-order").hooks({
    before: {
      all: [],
    },
  });
};
