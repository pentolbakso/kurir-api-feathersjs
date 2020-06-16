const mongoose = require("mongoose");
// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      email: { type: String, unique: true, lowercase: true, required: true },
      password: { type: String, required: true },
      role: {
        type: String,
        default: "customer",
        enum: ["customer", "driver", "operator", "admin"],
      },
      isConfirmed: { type: Boolean, default: false },
      isBlocked: { type: Boolean, default: false },

      fullname: { type: String, required: true },
      phonenumber: { type: Number, unique: true, required: true },
      gender: {
        type: String,
        default: "unspecified",
        enum: ["male", "female", "unspecified"],
      },
      birthYear: { type: Number },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
