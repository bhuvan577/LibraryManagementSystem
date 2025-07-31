import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    borrowedDate: {
      type: Date,
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

module.exports = Book;