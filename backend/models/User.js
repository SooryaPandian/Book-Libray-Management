const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  genres: [{ type: String }], // Array of genres that the user is interested in
  book_collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookCollection" }] // Array of book collection IDs
});

module.exports = mongoose.model("User", userSchema);
