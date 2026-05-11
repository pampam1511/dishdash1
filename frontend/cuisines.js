// asks the backend for all cuisines
async function loadCuisines() {
  try {
    // fetch cuisines from backend
    const res = await apiFetch("/api/cuisines");
    const cuisines = await res.json();

    // build the grid with results
    buildGrid(cuisines);
  } catch (err) {
    // show error if something goes wrong
    document.getElementById("cuisine-grid").innerHTML =
      "<p>Failed to load cuisines.</p>";
  }
}

// builds the cuisine cards on screen
function buildGrid(cuisines) {
  // find the grid and clear loading text
  const grid = document.getElementById("cuisine-grid");
  grid.innerHTML = "";

  // loop through every cuisine and make a card
  cuisines.forEach((c) => {
    // create a new div for this card
    const card = document.createElement("div");
    card.className = "cuisine-card";

    // fill it with cuisine data from database
    card.innerHTML = `
       <span class="cuisine-flag">${c.flag}</span>
      <div class="cuisine-name">${c.name}</div>
      <div class="cuisine-count">${c.recipe_count} recipe${c.recipe_count == 1 ? "" : "s"}</div>
    `;

    // when clicked: save cuisine and go to recipes page
    card.onclick = () => {
      localStorage.setItem("selectedCuisine", JSON.stringify(c));
      window.location.href = "recipes.html";
    };

    // add card to the grid
    grid.appendChild(card);
  });
}

// run when page loads
loadCuisines();
