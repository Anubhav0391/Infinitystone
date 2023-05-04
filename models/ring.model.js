const mongoose = require("mongoose");

const ringSchema = mongoose.Schema({
  imageurl: String,
  image: String,
  price: Number,
  originalprice: Number,
  title: String,
  size:Number
});

const RingModel = mongoose.model("ring", ringSchema);
module.exports = RingModel;