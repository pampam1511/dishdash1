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

function updatedTimer(){
    const m = Math.floor(timeLeft/60);
    const s = timeLeft % 60;
    const el = document.getElementById('timer');
    el.textContent = `${m}:{String(s).padStart(2,'0')}`;

    if (timeLeft > recipe.time * 0.6) el.style.color = #a5fda2;
    else if (timeLeft > recipe.time * 0.3) el.style.color = #FFE28A;
    else el.style.color = #F87C63;
}
function tick() {
    if (paused) return;
    timeLeft--;
    updatedTimer();
    updateProgress();

    if (timeLeft <= 0){
        clearInterval(timerInterval);
        goToResult(false);
    }
}

function updateProgress(){
    const done = stepsDone.filter(Boolean).length;
    const total = recipe.steps.length;
    document.getElementById('progress-fill').style.width= `${(done / total) * 100}%`;
    document.getElementById('progress-text').textContent = `${done}/${total}`;
}
