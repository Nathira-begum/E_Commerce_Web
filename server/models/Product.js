const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness at the database level
  },
  name: String,
  imageUrl: String,
  price: String,
  details: String,
  dealer: String,
  dealerPhone : String,
  dealerAddress : String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
