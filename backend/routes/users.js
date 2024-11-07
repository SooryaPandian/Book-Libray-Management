const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate.js'); // Middleware to verify JWT token

// Route to get the current user's profile info
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
