const mongoose = require("mongoose");
// schedules-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const daySchema = new mongoose.Schema({
  fromHour: { type: Number },
  toHour: { type: Number },
  active: { type: Boolean, default: true },
});

module.exports = function (app) {
  const modelName = "schedules";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      isDefault: { type: Boolean, default: false },
      //
      monday: { type: daySchema, required: true },
      tuesday: { type: daySchema, required: true },
      wednesday: { type: daySchema, required: true },
      thursday: { type: daySchema, required: true },
      friday: { type: daySchema, required: true },
      saturday: { type: daySchema, required: true },
      sunday: { type: daySchema, required: true },
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
