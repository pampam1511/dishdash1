const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authController = {
  // POST /api/auth/signup
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // check all fields provided
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
      }

      // create user in database
      const user = await User.create(username, email, password);

      // create JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({ user, token });
    } catch (err) {
      // check for duplicate email/username
      if (err.code === "23505") {
        return res
          .status(400)
          .json({ error: "Email or username already exists" });
      }
      console.error(err);
      res.status(500).json({ error: "Signup failed" });
    }
  },

  // POST /api/auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // check password against hash
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // create JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Login failed" });
    }
  },
};

module.exports = authController;
