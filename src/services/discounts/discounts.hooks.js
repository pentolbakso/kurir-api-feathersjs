const { authenticate } = require("@feathersjs/authentication").hooks;

const restrictOperator = require("../../hooks/restrict-operator")();

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [restrictOperator],
    update: [restrictOperator],
    patch: [restrictOperator],
    remove: [restrictOperator],
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
