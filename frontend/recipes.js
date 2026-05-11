const cuisine = JSON.parse(localStorage.getItem("selectedCuisine"));
if (!cuisine) window.location.href = "cuisines.html";

document.getElementById("cuisine-title").textContent =
  cuisine.name.toUpperCase();

async function loadRecipes() {
  try {
    const res = await apiFetch(`/api/recipes?cuisine_id=${cuisine.id}`);
    const recipes = await res.json();
    buildList(recipes);
  } catch (err) {
    document.getElementById("recipe-list").innerHTML =
      "<p>Failed to load recipes.</p>";
  }
}

function buildList(recipes) {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  if (recipes.length === 0) {
    list.innerHTML = '<p class="empty-msg">No recipes yet!</p>';
    return;
  }

  recipes.forEach((r) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
    <div class="recipe-name">${r.name}</div>
    <div class="recipe-meta">⏱ ${r.time}s · ${r.steps.length} steps</div>
    <span class="diff-badge diff-${r.difficulty}">${r.difficulty}</span>
    ${
      r.ingredients
        ? `
      <div class="recipe-ingredients">
        <div class="ingredients-title">Ingredients</div>
        <div class="ingredients-text">${r.ingredients}</div>
      </div>
  `
        : ""
    }
  <span class="recipe-arrow">→</span>
`;
    card.onclick = () => {
      localStorage.setItem("selectedRecipe", JSON.stringify(r));
      window.location.href = "game.html";
    };

    list.appendChild(card);
  });
}

loadRecipes();
