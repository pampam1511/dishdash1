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


function renderSteps() {
  const list = document.getElementById('steps-list');
  list.innerHTML = '';

  recipe.steps.forEach((step, i) => {
    const allPrev  = stepsDone.slice(0, i).every(Boolean);
    const isActive = !stepsDone[i] && allPrev;

    const div     = document.createElement('div');
    div.className = 'step-item'
      + (stepsDone[i] ? ' done'   : '')
      + (isActive     ? ' active' : '');

    div.innerHTML = `
      <div class="step-num">${stepsDone[i] ? '✓' : i + 1}</div>
      <div class="step-text">${step}</div>
    `;

    div.onclick = () => completeStep(i);
    list.appendChild(div);
  });
}

function completeStep(i) {
  if (paused) return; 

  const allPrev = stepsDone.slice(0, i).every(Boolean);
  if (!allPrev || stepsDone[i]) return; 

  stepsDone[i] = true;

  score += timeLeft > recipe.time * 0.5 ? 150 : 100;
  document.getElementById('score-display').textContent = score + ' pts';

  renderSteps();
  updateProgress();

  if (stepsDone.every(Boolean)) {
    clearInterval(timerInterval);
    goToResult(true); // true = completed
  }
}

document.getElementById('btn-pause').addEventListener('click', () => {
  paused = !paused; 
  document.getElementById('btn-pause').textContent = paused ? '▶ Resume' : '⏸ Pause';
});

document.getElementById('btn-done').addEventListener('click', () => {
  clearInterval(timerInterval);
  goToResult(stepsDone.every(Boolean));
});

function quitGame() {
  clearInterval(timerInterval); 
  window.location.href = 'recipes.html';
}


function goToResult(completed) {
  const done = stepsDone.filter(Boolean).length;
  const timeBonus = completed ? timeLeft * 2 : 0;
  localStorage.setItem('result', JSON.stringify({
    completed,
    score:     score + timeBonus,
    timeLeft,
    done,
    total:     recipe.steps.length,
    recipeName: recipe.name
  }));

  window.location.href = 'result.html';
}
