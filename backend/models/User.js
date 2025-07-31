// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  borrowHistory: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      borrowedAt: { type: Date, default: Date.now },
      returnedAt: { type: Date },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;