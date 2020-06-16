const mongoose = require("mongoose");
/*
Pricing schema
- by weight: 
  0 - 2Kg : 5000
  2 - 4Kg : 5000
  extra: 2500/Kg
- by distance
  0 - 5Km : x1
  5 - 9Km : x2
  extra: 0.2
*/

const weightOnlySchema = new mongoose.Schema({
  fromWeight: { type: Number },
  toWeight: { type: Number },
  fixedPrice: { type: Number, required: true },
  addPrice: { type: Number, default: 0 },
});
const distanceOnlySchema = new mongoose.Schema({
  fromDistance: { type: Number },
  toDistance: { type: Number },
  fixedPrice: { type: Number, required: true },
  addPrice: { type: Number, default: 0 },
});
const hybridSchema = new mongoose.Schema({
  fromWeight: { type: Number },
  toWeight: { type: Number },
  fixedWeightPrice: { type: Number, required: true },
  extraWeightPrice: { type: Number, default: 0 },
  fromDistance: { type: Number },
  toDistance: { type: Number },
  fixedMultiplier: { type: Number, required: true },
  addMultiplier: { type: Number, default: 0 },
});

module.exports = function (app) {
  const modelName = "products";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      isActive: { type: Boolean, default: true },
      image: { type: String },
      isSameDay: { type: Boolean, default: false },
      pricingMode: {
        type: String,
        enum: ["weightOnly", "distanceOnly", "hybrid"],
        required: true,
      },
      weightOnly: { type: [weightOnlySchema] },
      distanceOnly: { type: [distanceOnlySchema] },
      hybrid: { type: [hybridSchema] },
      //
      schedule: { type: mongoose.ObjectId, ref: "schedules" },
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
