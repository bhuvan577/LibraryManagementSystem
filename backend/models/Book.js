// backend/models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  category: String,
  language: String,
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.Book || mongoose.model("Book", bookSchema);

module.exports = User;