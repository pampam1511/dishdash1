const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
if (!recipe) window.location.href = "cuisines.html";

let currentStep = 0;
let timeLeft = 0;
let timerInterval = null;
let score = 0;
let paused = false;
let stepsDone = new Array(recipe.steps.length).fill(false);

document.getElementById("game-title").textContent = recipe.name;
document.getElementById("game-meta").textContent =
  `${recipe.cuisine} · ${recipe.difficulty}`;

function updateTimer() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const el = document.getElementById("timer");
  el.textContent = `${m}:${String(s).padStart(2, "0")}`;

  const stepTime = recipe.steps[currentStep].time;
  if (timeLeft > stepTime * 0.6) el.style.color = "#4A7C2F";
  else if (timeLeft > stepTime * 0.3) el.style.color = "#D4A017";
  else el.style.color = "#C9521C";
}

function tick() {
  if (paused) return;
  timeLeft--;
  updateTimer();

  if (timeLeft <= 0) {
    score = Math.max(0, score - 50);
    document.getElementById("score-display").textContent = score + " pts";
    moveToNextStep();
  }
}

function startStepTimer() {
  clearInterval(timerInterval);
  timeLeft = recipe.steps[currentStep].time;
  updateTimer();
  timerInterval = setInterval(tick, 1000);
}

function moveToNextStep() {
  clearInterval(timerInterval);

  if (currentStep < recipe.steps.length - 1) {
    currentStep++;
    startStepTimer();
    renderSteps();
    updateProgress();
  } else {
    goToResult(true);
  }
}

function updateProgress() {
  const stepTime = recipe.steps[currentStep].time;
  const pct = (timeLeft / stepTime) * 100;
  document.getElementById("progress-fill").style.width = `${pct}%`;
}

function renderSteps() {
  const list = document.getElementById("steps-list");
  list.innerHTML = "";

  recipe.steps.forEach((step, i) => {
    const div = document.createElement("div");

    if (i < currentStep) div.className = "step-item done";
    else if (i === currentStep) div.className = "step-item active";
    else div.className = "step-item";

    div.innerHTML = `
      <div class="step-num">${i < currentStep ? "✓" : i + 1}</div>
      <div class="step-content">
        <div class="step-text">${step.text}</div>
        <div class="step-time">⏱ ${step.time}s</div>
      </div>
    `;

    list.appendChild(div);
  });
}

document.getElementById("btn-done").addEventListener("click", () => {
  clearInterval(timerInterval);

  const pointsEarned = 100 + Math.floor(timeLeft * 2);
  score += pointsEarned;
  document.getElementById("score-display").textContent = score + " pts";

  moveToNextStep();
});

document.getElementById("btn-pause").addEventListener("click", () => {
  paused = !paused;
  document.getElementById("btn-pause").textContent = paused
    ? "▶ Resume"
    : "⏸ Pause";
});

function quitGame() {
  clearInterval(timerInterval);
  window.location.href = "recipes.html";
}

function goToResult(completed) {
  clearInterval(timerInterval);
  localStorage.setItem(
    "result",
    JSON.stringify({
      completed,
      score,
      stepsCompleted: currentStep,
      total: recipe.steps.length,
      recipeName: recipe.name,
    }),
  );
  window.location.href = "result.html";
}

renderSteps();
updateProgress();
startStepTimer();
