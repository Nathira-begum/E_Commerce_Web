const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const FlashSale = require('../models/FlashSale');

// GET all products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product
router.post('/add-product', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: 'Product added' });
});

// UPDATE product
router.put('/update-product/:productId', async (req, res) => {
  await Product.findOneAndUpdate({ productId: req.params.productId }, req.body);
  res.json({ message: 'Product updated' });
});

// DELETE product
router.delete('/delete-product/:productId', async (req, res) => {
  const { productId } = req.params;

  await Product.findOneAndDelete({ productId });
  await FlashSale.findOneAndDelete({ productId }); // Delete from flash sale too

  res.json({ message: 'Product and Flash Sale entry deleted' });
});

module.exports = router;
