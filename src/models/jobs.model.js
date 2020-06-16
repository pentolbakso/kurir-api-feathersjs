// jobs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html

const mongoose = require("mongoose");
const addressSchema = require("./address.schema");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: Number, default: 0 },
});

// for more of what you can do here.
module.exports = function (app) {
  const modelName = "jobs";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      customer: { type: mongoose.ObjectId, ref: "users", required: true },
      pickupAddress: { type: addressSchema, required: true },
      destinationFullname: { type: String, required: true },
      destinationPhonenumber: { type: String, required: true },
      destinationAddress: { type: addressSchema, required: true },
      product: { type: mongoose.ObjectId, ref: "products", required: true },
      status: {
        type: String,
        enum: [
          "open",
          "rejected",
          "waitPickup",
          "inProgress",
          "delivered",
          "canceled",
        ],
        default: "open",
      },
      driver: { type: mongoose.ObjectId, ref: "users" },
      //shipping items
      items: { type: [itemSchema], required: true },
      totalWeight: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      discount: { type: mongoose.ObjectId, ref: "discounts" },
      discountPrice: { type: Number, default: 0 },
      finalPrice: { type: Number, required: true },
      //meta
      rejectReason: { type: String },
      cancelReason: { type: String },
      pickupAt: { type: Date },
      deliveredAt: { type: Date },
      receiverName: { type: String },
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
