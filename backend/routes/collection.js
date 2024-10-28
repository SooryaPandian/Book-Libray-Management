const express = require("express");
const jwt = require("jsonwebtoken");
const BookCollection = require("../models/BookCollection");
const User = require("../models/User");

const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

// Create Collection
router.post("/", authenticate, async (req, res) => {
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
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ message: "Error creating collection", error });
  }
});

// Get User Collections
router.get("/", authenticate, async (req, res) => {
  try {
    const collections = await BookCollection.find({ user_id: req.userId });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error });
  }
});

// Get a Collection by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const collection = await BookCollection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collection", error });
  }
});

// Update Collection
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { collection_name, description, book_ids, visibility } = req.body;
    const collection = await BookCollection.findByIdAndUpdate(req.params.id, {
      collection_name,
      description,
      book_ids,
      visibility
    }, { new: true });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: "Error updating collection", error });
  }
});

module.exports = router;
