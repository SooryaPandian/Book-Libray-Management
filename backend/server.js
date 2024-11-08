const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const collectionRoutes = require("./routes/collection");
const userRoutes = require('./routes/users'); // Ensure correct file path

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// CORS setup
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allows cookies and Authorization headers
};
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/users", userRoutes); // Use `/api/users` to match frontend request

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
