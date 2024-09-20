const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the user model
const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash password
    });

    await user.save(); // Save user in MongoDB
    res.json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
