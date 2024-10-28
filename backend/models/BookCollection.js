const mongoose = require("mongoose");

const bookCollectionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collection_name: { type: String, required: true },
  added_time: { type: Date, default: Date.now },
  description: { type: String },
  book_ids: [{ type: String }],
  visibility: { type: String, enum: ["public", "private"], default: "private" }
});

module.exports = mongoose.model("BookCollection", bookCollectionSchema);
