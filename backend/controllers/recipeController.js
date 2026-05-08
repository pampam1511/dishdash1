const Recipe = require("../models/recipe");

const recipeController = {
  // GET /api/recipes
  getAll: async (req, res) => {
    try {
      const recipes = await Recipe.getAll();
      res.json(recipes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  },

  // GET /api/recipes/:id
  getById: async (req, res) => {
    try {
      const recipe = await Recipe.getById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  },
};

module.exports = recipeController;
