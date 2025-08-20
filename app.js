async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

function renderMenu(pages) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  pages.forEach((page) => {
    const link = document.createElement("a");
    link.href = `#${page.id}`;
    link.textContent = page.title;
    menu.appendChild(link);
  });
}

function renderPage(data, id) {
  const pages = data.pages;
  const page = pages.find((p) => p.id === id) || pages[0];
  const content = document.getElementById("content");

  if (id === "projects") {
    const container = document.createElement("div");
    container.className = "projects-container";

    data.projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <div class="card-buttons">
        <button class="desc-btn">View Description</button>
        <a href="${project.link}" target="_blank" class="github-link">🔗 GitHub</a>
      </div>
      <p class="project-desc">${project.description}</p>
    `;

      container.appendChild(card);
    });

    content.innerHTML = "<h2>My Projects</h2>";
    content.appendChild(container);

    // Add eventt listener for toggling descriprion
    const buttons = document.querySelectorAll(".desc-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const desc = btn.nextElementSibling;
        desc.classList.toggle("show");
        btn.textContent = desc.classList.contains("show")
          ? "Hide Description"
          : "View Description";
      });
    });
  } else {
    content.innerHTML = page.content;
  }
}

async function init() {
  const data = await loadData();
  renderMenu(data.pages);

  function updatePage() {
    const id = window.location.hash.substring(1) || "home";
    renderPage(data, id);
  }
  window.addEventListener("hashchange", updatePage);
  updatePage();
}

init();
