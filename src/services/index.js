const customerOrder = require("./customer/customer-order.service.js");
const customerAddress = require("./customer/customer-address.service.js");
//
const users = require("./users/users.service.js");
const jobs = require("./jobs/jobs.service.js");
const addresses = require("./addresses/addresses.service.js");
const products = require("./products/products.service.js");
const schedules = require("./schedules/schedules.service.js");
const subdistricts = require("./subdistricts/subdistricts.service.js");
const villages = require("./villages/villages.service.js");
const discounts = require("./discounts/discounts.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customerOrder);
  app.configure(customerAddress);
  //
  app.configure(users);
  app.configure(jobs);
  app.configure(addresses);
  app.configure(products);
  app.configure(schedules);
  app.configure(subdistricts);
  app.configure(villages);
  app.configure(discounts);
};
