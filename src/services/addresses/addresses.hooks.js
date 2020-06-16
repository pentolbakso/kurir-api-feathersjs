const { authenticate } = require("@feathersjs/authentication").hooks;
const { Forbidden } = require("@feathersjs/errors");

// only customers, admins allow to CRUD address
const restrictUser = require("../../hooks/restrict-user")("customer");
const populateUser = require("../../hooks/populate-user")("customer");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [restrictUser],
    get: [restrictUser],
    create: [populateUser],
    update: [restrictUser],
    patch: [restrictUser],
    remove: [restrictUser],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
