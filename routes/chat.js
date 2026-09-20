const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const wrapAsync = require("../utils/wrapAsync.js");
const { chat } = require("../controllers/chat.js");

const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // 30 messages per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: "You're sending messages a little fast — please wait a moment and try again." });
  },
});

router.post("/", chatLimiter, wrapAsync(chat));

module.exports = router;
