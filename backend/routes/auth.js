const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { user_name, email, password, genres } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ user_name, email, password: hashedPassword, genres });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Signup error:', error); // Log error to the console
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });
    res.cookie("token", token, { httpOnly: true });
    console.log(token);
    res.json({ message: "Logged in successfully","token":token});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
