const mongoose = require("mongoose");
const coordinateSchema = require("./coordinate.schema");

const addressSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.ObjectId }, //optional
    name: { type: String },
    type: {
      type: String,
      enum: ["pickup", "destination"],
      required: true,
    },
    address: { type: String, required: true },
    addressNotes: { type: String },
    coordinate: { type: coordinateSchema, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = addressSchema;
