const express = require("express");
const jwt = require("jsonwebtoken");
const BookCollection = require("../models/BookCollection");
const User = require("../models/User");

const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  console.log("Auth Middleware: Token received:", token);
  
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
    console.log("Auth Middleware: Token verified, user ID:", req.userId);
    next();
  });
};


// Create Collection
router.post("/", authenticate, async (req, res) => {
  console.log("Create Collection: Request received with data:", req.body);
  try {
    const { collection_name, description, book_ids, visibility } = req.body;
    const newCollection = new BookCollection({
      user_id: req.userId,
      collection_name,
      description,
      book_ids,
      visibility
    });
    await newCollection.save();
    console.log("Create Collection: New collection created:", newCollection);
    res.status(201).json(newCollection);
  } catch (error) {
    console.log("Create Collection: Error creating collection:", error.message);
    res.status(500).json({ message: "Error creating collection", error });
  }
});

// Get User Collections
router.get("/", authenticate, async (req, res) => {
  console.log("Get Collections: Request received for user ID:", req.userId);
  try {
    const collections = await BookCollection.find({ user_id: req.userId });
    console.log("Get Collections: Collections fetched:", collections);
    res.json(collections);
  } catch (error) {
    console.log("Get Collections: Error fetching collections:", error.message);
    res.status(500).json({ message: "Error fetching collections", error });
  }
});

// Get a Collection by ID
router.get("/:id", authenticate, async (req, res) => {
  console.log("Get Collection by ID: Request received for collection ID:", req.params.id);
  try {
    const collection = await BookCollection.findById(req.params.id);
    if (!collection) {
      console.log("Get Collection by ID: Collection not found");
      return res.status(404).json({ message: "Collection not found" });
    }
    console.log("Get Collection by ID: Collection fetched:", collection);
    res.json(collection);
  } catch (error) {
    console.log("Get Collection by ID: Error fetching collection:", error.message);
    res.status(500).json({ message: "Error fetching collection", error });
  }
});

// Update Collection
router.put("/:id", authenticate, async (req, res) => {
  console.log("Update Collection: Request received for collection ID:", req.params.id);
  console.log("Update Collection: Update data:", req.body);
  try {
    const { collection_name, description, book_ids, visibility } = req.body;
    const collection = await BookCollection.findByIdAndUpdate(
      req.params.id,
      { collection_name, description, book_ids, visibility },
      { new: true }
    );
    if (!collection) {
      console.log("Update Collection: Collection not found");
      return res.status(404).json({ message: "Collection not found" });
    }
    console.log("Update Collection: Collection updated:", collection);
    res.json(collection);
  } catch (error) {
    console.log("Update Collection: Error updating collection:", error.message);
    res.status(500).json({ message: "Error updating collection", error });
  }
});

module.exports = router;
