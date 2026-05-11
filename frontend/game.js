const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
if (!recipe) window.location.href = "cuisines.html";

let timeLeft = recipe.time;
let timerInterval = null;
let stepsDone = new Array(recipe.steps.length).fill(false);
let score = 0;
let paused = false;

document.getElementById("game-title").textContent = recipe.name;
document.getElementById("game-meta").textContent =
  `${recipe.cuisine} · ${recipe.difficulty}`;
