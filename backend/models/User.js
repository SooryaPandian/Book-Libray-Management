const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  genres: [{ type: String }],
  book_collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookCollection" }]
});

module.exports = mongoose.model("User", userSchema);
