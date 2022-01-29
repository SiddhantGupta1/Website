const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productPhoto: {
    img: { type: String },
  },
  category: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
