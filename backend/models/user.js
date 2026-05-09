const pool = require("./db");
const bcrypt = require("bcrypt");

const User = {
  // create a new user
  create: async (username, email, password) => {
    // hash the password with 10 salt rounds
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, password_hash],
    );
    return result.rows[0];
  },

  // find user by email
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },

  // find user by id
  findById: async (id) => {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [id],
    );
    return result.rows[0];
  },
};

module.exports = User;
