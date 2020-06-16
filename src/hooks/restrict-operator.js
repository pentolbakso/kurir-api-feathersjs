const { Forbidden } = require("@feathersjs/errors");
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = () => {
  return async (context) => {
    const { user } = context.params;
    if (user.role === "admin" || user.role === "operator") {
      return context;
    } else {
      throw new Forbidden("You are not allowed to access this");
    }
  };
};
