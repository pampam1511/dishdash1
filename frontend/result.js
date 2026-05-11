const result = JSON.parse(localStorage.getItem("result"));
const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
if (!result) window.location.href = "cuisines.html";

const { completed, score, stepsCompleted, total } = result;

// above 50% of steps = win
const pct = stepsCompleted / total;
const won = pct > 0.5;

if (won) {
  let headline, sub;
  if (pct === 1) {
    headline = "YAYYY YOU DONE IT!!!!!!";
    sub = "YOU ARE SUPER DUPER FAST";
  } else if (pct >= 0.8) {
    headline = "SO CLOSE TO PERFECT!!!";
    sub = "YOU ARE PRETTY FAST";
  } else {
    headline = "NOT BAD!!!";
    sub = "JUST ABOVE THE LINE";
  }

  document.getElementById("result-headline").textContent = headline;
  document.getElementById("result-sub").textContent = sub;
  document.getElementById("result-character").src =
    "images/celebration-pom.png";
  document.getElementById("result-page").classList.add("result-win");
  spawnConfetti();
} else {
  let headline, sub;
  if (pct === 0) {
    headline = "OH NOOOOOOOOOO!!!!!!";
    sub = "YOU ARE SUPER SLOW";
  } else if (pct >= 0.3) {
    headline = "SO CLOSE THOUGH!!!";
    sub = "JUST BELOW THE LINE";
  } else {
    headline = "OH NOOOOOOOOOO!!!!!!";
    sub = "YOU ARE SUPER SLOW";
  }

  document.getElementById("result-headline").textContent = headline;
  document.getElementById("result-sub").textContent = sub;
  document.getElementById("result-character").src = "images/sad-pom.png";
  document.getElementById("result-page").classList.add("result-lose");
  spawnRain();
}

// show steps e.g. 5/5
document.getElementById("result-score").textContent =
  `${stepsCompleted}/${total}`;

function spawnConfetti() {
  const wrap = document.getElementById("confetti-wrap");
  const colours = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFE66D",
    "#A8E6CF",
    "#6C63FF",
    "#FF8B94",
  ];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background =
      colours[Math.floor(Math.random() * colours.length)];
    piece.style.width = `${Math.random() * 10 + 6}px`;
    piece.style.height = `${Math.random() * 10 + 6}px`;
    piece.style.animationDelay = `${Math.random() * 3}s`;
    piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
    wrap.appendChild(piece);
  }
}

function spawnRain() {
  const wrap = document.getElementById("rain-wrap");
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement("div");
    drop.className = "rain-drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
    drop.style.height = `${Math.random() * 40 + 20}px`;
    wrap.appendChild(drop);
  }
}

function retryRecipe() {
  window.location.href = "game.html";
}
