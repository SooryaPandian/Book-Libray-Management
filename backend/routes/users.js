// In routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // JWT authentication middleware

// GET /api/user/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Fetch user by ID, excluding password
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user); // Send user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
