// load environment variables from .env file
require("dotenv").config();

// import express
const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipe"); // ← ADD THIS LINE

// create the app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({ message: "DishDash API is running! 🍽️" });
});

app.use("/api/recipes", recipeRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
