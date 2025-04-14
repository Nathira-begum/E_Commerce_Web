const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const FlashSale = require('../models/FlashSale');

// POST: Add product to flash sale
router.post('/flash-sale', async (req, res) => {
  try {
    const { productId } = req.body;

    // Find product by productId
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found in product database' });
    }

    // Create a new FlashSale entry
    const flashItem = new FlashSale({
      productId: product.productId,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      details: product.details,
    });

    await flashItem.save();

    res.status(201).json({ message: 'Product added to Flash Sale successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete flash sale
router.delete('/delete-flash-sale/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    await FlashSale.findOneAndDelete({ productId });
    res.json({ message: 'Flash sale item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flash sale item' });
  }
});

// Optional: GET all flash sale products
router.get('/flash-sale', async (req, res) => {
  try {
    const flashItems = await FlashSale.find();
    res.json(flashItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
