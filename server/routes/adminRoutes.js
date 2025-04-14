const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Admin Login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.isAdmin = true;
  res.json({ message: 'Login successful' });
});

// Admin Auth Check
router.get('/admin-auth', (req, res) => {
  if (req.session.isAdmin) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Admin Logout
router.post('/admin-logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

module.exports = router;
