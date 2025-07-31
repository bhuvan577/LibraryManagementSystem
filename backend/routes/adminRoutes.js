const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const User = require("../models/User");
const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");

const router = express.Router();

// 📊 GET admin stats
router.get("/stats", authMiddleware, isAdmin, async (req, res) => {
  const books = await Book.countDocuments();
  const users = await User.countDocuments();
  const borrowed = await Borrow.countDocuments({ returned: false });
  res.json({ books, users, borrowed });
});

// 📄 Borrow history
router.get("/borrow-history", authMiddleware, isAdmin, async (req, res) => {
  const history = await Borrow.find()
    .populate("user", "name")
    .populate("book", "title")
    .sort({ date: -1 });
  res.json(history);
});

module.exports = router;
