const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // JWT authentication middleware
const bcrypt = require('bcrypt');

// GET /api/users/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Fetch user by ID, excluding password
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user); // Send user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/users/profile
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

// PUT /api/users/profile/password
router.put('/profile/password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Retrieve the user from the database
    console.log("Got the password to change");
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
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

// DELETE /api/users/profile (with authenticate middleware)
router.delete('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication middleware
    console.log("Account Deleting ....");

    // Delete user from the database using the extracted user ID
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Error deleting account" });
  }
});

module.exports = router;
