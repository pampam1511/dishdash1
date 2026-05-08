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

app.get("/api/recipes", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Pasta Aglio e Olio",
      time: 90,
      steps: ["Boil water", "Cook pasta", "Add sauce"],
    },
    {
      id: 2,
      name: "Street Tacos",
      time: 75,
      steps: ["Season beef", "Cook mince", "Warm tortillas", "Assemble"],
    },
  ]);
});

// start listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
