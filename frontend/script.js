let recipe = {
  name: "Pasta",
  time: 90,
  steps: ["Boil water", "Add salt", "Cook Pasta"],
};

let card = document.querySelector(".recipe-name");
card.textContent = recipe.name;

let timeLeft = recipe.time;
let timerInterval;

let btn = document.querySelector(".start-btn");
let timerDisplay = document.querySelector(".timer");

btn.addEventListener("click", function () {
  timerInterval = setInterval(function () {
    timeLeft = timeLeft - 1; //substract 1
    timerDisplay.textContent = timeLeft; //update screen

    // colour logic
    if (timeLeft > 60) {
      timerDisplay.style.color = "green";
    } else if (timeLeft > 30) {
      timerDisplay.style.color = "orange";
    } else {
      timerDisplay.style.color = "red";
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // stops
      timerDisplay.textContent = "TIMES UP!!!";
    }
  }, 1000);
});
