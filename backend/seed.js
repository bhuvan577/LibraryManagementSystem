// backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");
const Book = require("./models/Book");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear old data
    await User.deleteMany();
    await Book.deleteMany();

    // Create users
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });

    const user = new User({
      name: "Normal User",
      email: "user@example.com",
      password: await bcrypt.hash("user123", 10),
      role: "user",
    });

    await admin.save();
    await user.save();

    // Create books
    const books = [
      {
        title: "Learn JavaScript",
        author: "John Doe",
        category: "Programming",
        language: "English",
        quantity: 3,
      },
      {
        title: "React in Action",
        author: "Mark T",
        category: "Frontend",
        language: "English",
        quantity: 2,
      },
      {
        title: "MongoDB Basics",
        author: "Jane Smith",
        category: "Database",
        language: "English",
        quantity: 4,
      },
    ];

    await Book.insertMany(books);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};
seed();
