// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const Book = require("../models/Book");
const { authMiddleware, requireRole } = require("../middleware/auth");

const router = express.Router();

// Borrow a book
router.post(
  "/borrow/:bookId",
  authMiddleware,
  requireRole("user"),
  async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book || book.quantity < 1)
      return res.status(400).json({ message: "Book not available" });

    // Update book quantity
    book.quantity -= 1;
    await book.save();

    // Update user borrow history
    await User.findByIdAndUpdate(userId, {
      $push: {
        borrowHistory: {
          bookId: book._id,
          borrowedAt: new Date(),
        },
      },
    });

    res.json({ message: "Book borrowed successfully" });
  }
);

// Return a book
router.post(
  "/return/:bookId",
  authMiddleware,
  requireRole("user"),
  async (req, res) => {
    const { bookId } = req.params;
    const user = await User.findById(req.user.id);

    const borrowed = user.borrowHistory.find(
      (item) => item.bookId.toString() === bookId && !item.returnedAt
    );
    if (!borrowed)
      return res
        .status(400)
        .json({ message: "Book not found in borrow history" });

    // Mark as returned
    borrowed.returnedAt = new Date();
    await user.save();

    // Increment book quantity
    await Book.findByIdAndUpdate(bookId, { $inc: { quantity: 1 } });

    res.json({ message: "Book returned successfully" });
  }
);

// Get current user's borrow history
router.get(
  "/me/history",
  authMiddleware,
  requireRole("user"),
  async (req, res) => {
    const user = await User.findById(req.user.id).populate(
      "borrowHistory.bookId"
    );
    res.json(user.borrowHistory);
  }
);

// Admin: View any user's history
router.get(
  "/:userId/history",
  authMiddleware,
  requireRole("admin"),
  async (req, res) => {
    const user = await User.findById(req.params.userId).populate(
      "borrowHistory.bookId"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.borrowHistory);
  }
);

module.exports = router;
