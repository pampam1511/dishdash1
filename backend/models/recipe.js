const pool = require("./db");

const Recipe = {
  // get all recipes
  getAll: async () => {
    const result = await pool.query("SELECT * FROM recipes");
    return result.rows;
  },

  // get one recipe by id
  getById: async (id) => {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  // create a new recipe
  create: async (name, time, difficulty, cuisine, steps) => {
    const result = await pool.query(
      "INSERT INTO recipes (name, time, difficulty, cuisine, steps) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, time, difficulty, cuisine, steps],
    );
    return result.rows[0];
  },
};

module.exports = Recipe;
