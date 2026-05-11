const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
if (!recipe) window.location.href = "cuisines.html";

let timeLeft = recipe.time;
let timerInterval = null;
let stepsDone = new Array(recipe.steps.length).fill(false);
let score = 0;
let paused = false;
