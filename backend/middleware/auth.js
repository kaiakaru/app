// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing authorization header" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed authorization header" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // e.g. { userId: '...', iat: .. }
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};