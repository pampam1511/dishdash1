const express = require("express");
const router = express.Router();
const pool = require("../models/db");

// GET /api/cuisines
// returns all cuisines from the database
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        cuisines.*,
        COUNT(recipes.id) AS recipe_count
      FROM cuisines
      LEFT JOIN recipes ON recipes.cuisine_id = cuisines.id
      GROUP BY cuisines.id
      ORDER BY cuisines.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cuisines" });
  }
});

module.exports = router;
