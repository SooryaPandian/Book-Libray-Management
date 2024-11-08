// In routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // JWT authentication middleware
const bcrypt = require('bcrypt');


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

// Add to routes/users.js
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { user_name, email, genres } = req.body;
    console.log("Successfully got the data from the user for updating");
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.user_name = user_name || user.user_name;
    user.email = email || user.email;
    user.genres = genres || user.genres;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
});

// PUT /api/users/profile/update-password
router.put('/profile/password', authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Retrieve the user from the database
    console.log("Got the password to change");
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    // Save the updated password to the database
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
