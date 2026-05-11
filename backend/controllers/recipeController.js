const Recipe = require("../models/recipe");

const recipeController = {
  // GET /api/recipes or GET /api/recipes?cuisine_id=1
  getAll: async (req, res) => {
    try {
      // check if cuisine_id was passed in the URL
      // req.query reads anything after the ? in the URL
      const { cuisine_id } = req.query;

      const recipes = cuisine_id
        ? await Recipe.getByCuisine(cuisine_id) // filter by cuisine
        : await Recipe.getAll(); // return all

      res.json(recipes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  },

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
