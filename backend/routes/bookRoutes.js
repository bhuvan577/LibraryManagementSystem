// backend/routes/bookRoutes.js
const express = require("express");
const Book = require("../models/Book");
const { authMiddleware, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET all books (public)
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET single book by ID
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST create book (Admin only)
router.post("/", authMiddleware, requireRole("admin"), async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json({ message: "Book added successfully", book: newBook });
});

// PUT update book (Admin only)
router.put("/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book updated", book: updated });
});

// DELETE book (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  async (req, res) => {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  }
);

module.exports = router;
