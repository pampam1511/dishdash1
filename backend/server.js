// load environment variables from .env file
require("dotenv").config();

// import express
const express = require("express");
const cors = require("cors");

// create the app — like Flask's app = Flask(__name__)
const app = express();

// middleware — runs on every request
app.use(cors()); // allow frontend to talk to us
app.use(express.json()); // allow JSON data in request bodies

// our first route
app.get("/", (req, res) => {
  res.json({ message: "DishDash API is running! 🍽️" });
});

app.use("/api/recipes", recipeRoutes);

// start listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
