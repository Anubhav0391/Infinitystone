const mongoose = require("mongoose");

const earringSchema = mongoose.Schema({
  imageurl: String,
  image: String,
  price: Number,
  originalprice: Number,
  title: String,
  size:Number
});

const EarringModel = mongoose.model("earring", earringSchema);
module.exports = EarringModel;