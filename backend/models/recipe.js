const pool = require("./db");

const Recipe = {
  getAll: async () => {
    const result = await pool.query(
      "SELECT *, steps_json as steps FROM recipes ORDER BY name",
    );
    return result.rows;
  },

  getByCuisine: async (cuisine_id) => {
    const result = await pool.query(
      "SELECT *, steps_json as steps FROM recipes WHERE cuisine_id = $1 ORDER BY name",
      [cuisine_id],
    );
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query(
      "SELECT *, steps_json as steps FROM recipes WHERE id = $1",
      [id],
    );
    return result.rows[0];
  },

  create: async (name, time, difficulty, cuisine, cuisine_id, steps) => {
    const result = await pool.query(
      "INSERT INTO recipes (name, time, difficulty, cuisine, cuisine_id, steps_json) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [name, time, difficulty, cuisine, cuisine_id, JSON.stringify(steps)],
    );
    return result.rows[0];
  },
};

module.exports = Recipe;
