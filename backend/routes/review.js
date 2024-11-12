const express = require('express');
const Review = require('../models/Review');
const jwt = require("jsonwebtoken");
const router = express.Router();


// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    // console.log("Auth Middleware: Token received:", token);
    
    if (!token) {
      console.log("Auth Middleware: No token, unauthorized request");
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Auth Middleware: Invalid token error:", err.message);
        return res.status(403).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      // console.log("Auth Middleware: Token verified, user ID:", req.userId);
      console.log("Auth Middleware: Token verified");
      next();
    });
  };
  
  
  // Add a new review
  router.post("/", authenticate, async (req, res) => {
    console.log(req.userId);
    console.log("Adding review")
    const { book_id, rating, review_text } = req.body;
  
    try {
      const newReview = new Review({
        user: req.userId,
        book_id,
        rating,
        review_text,
      });
  
      await newReview.save();
      console.log("Review added successfully");
      res.status(201).json({ message: "Review added successfully", newReview });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Error adding review", error });
    }
  });




  router.get('/:book_id', async (req, res) => {
    try {
      const reviews = await Review.find({ book_id: req.params.book_id })
        .populate('user', 'user_name')
        .sort({ timestamp: -1 });
  
      const averageRating = reviews.length
        ? (await Review.aggregate([
            { $match: { book_id: req.params.book_id } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } },
          ]))[0]?.avgRating || 0
        : 0;
  
      res.status(200).json({ reviews, averageRating: averageRating.toFixed(1) });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
