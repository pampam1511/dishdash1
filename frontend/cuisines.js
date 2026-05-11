async function loadCuisines() {
  try {
    const res = await apiFetch("/api/cusines");
    const cusines = await res.json();
    buildGrid(cusines);
  } catch (err) {
    document.getElementById("cusine-grid").innerHTML =
      "<p>Failed to load cuisines.</p>";
  }
  function buildGrid(cusines) {
    // find the grid div
    const grid = document.getElementById("cusine-grid");
    grid.innerHTML = "";
    //loop through every cusine
    cusines.forEach((c) => {
      //vreates a new div for card
      const card = document.createElement("div");
      card.className = "cusines-card";
      //fill it with cusine data
      card.innerHTML = `
                <span class="cuisine-flag">${c.flag}</span>
                <div class="cuisine-name">${c.name}</div>
                <div class="cuisine-desc">${c.description || ""}</div>
            `;

      //when clicked save cusine and go to recipes page
      card.onclick = () => {
        localStorage.setItem("selectedCusine", JSON.stringify(c));
        window.location.href = "recipes.html";
      };

      //adds the card to the grid
      grid.appendChild(card);
    });
  }
  loadCuisines();
}
