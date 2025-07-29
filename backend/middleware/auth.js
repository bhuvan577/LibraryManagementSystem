// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

module.exports = { authMiddleware, requireRole };
