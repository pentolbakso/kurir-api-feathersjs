const { Forbidden } = require("@feathersjs/errors");
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (role = "user") => {
  return async (context) => {
    const { user } = context.params;
    if (user.role === "admin" || user.role === "operator") {
      // admin/operator MUST set role-id on request body
      return context;
    } else if (user.role === role) {
      context.data[role] = user._id;
    } else throw new Forbidden("You are not allowed to access this");

    return context;
  };
};
