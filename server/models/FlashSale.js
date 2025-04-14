const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
  productId: String,
  name: String,
  imageUrl: String,
  price: Number,
  details: String,
});

module.exports = mongoose.model('FlashSale', flashSaleSchema);
