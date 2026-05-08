const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// GET /api/recipes
router.get("/", recipeController.getAll);

// GET /api/recipes/:id
router.get("/:id", recipeController.getById);

module.exports = router;
