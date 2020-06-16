const { Forbidden } = require("@feathersjs/errors");
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (role = "user") => {
  //https://stackoverflow.com/questions/48595255/structure-restricttoowner-restricttoroles-in-feathersjs
  return async (context) => {
    const { user } = context.params;

    // For admin and operator allow everything
    if (user.role === "admin" || user.role === "operator") {
      return context;
    } else if (user.role !== role) {
      throw new Forbidden("Only " + role + " allowed to access this");
    }

    if (!context.id) {
      // When requesting multiple (list item), restrict the query to the user
      context.params.query[role] = user._id;
    } else {
      // When acessing a single item, check first if the user is an owner
      const item = await context.service.get(context.id);
      if (item[role] !== user._id) {
        throw new Forbidden("You are not allowed to access this");
      }
    }
    //console.log("user", context.params.query.customer);
    return context;
  };
};
