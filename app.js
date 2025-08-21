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
    menu.append(link);
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
    `;

      container.appendChild(card);
    });

    content.innerHTML = "<h2>My Projects</h2>";
    content.appendChild(container);

    // Add event listener for showing modal description
    const buttons = document.querySelectorAll(".desc-btn");

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const project = data.projects[index];

        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-desc").textContent = project.description;

        document.getElementById("modal").style.display = "flex";
      });
    });

    document.querySelector(".close-btn").addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
      }
    });
  } else {
    content.innerHTML = page.content;
  }
}

async function init() {
  const data = await loadData();
  console.log(data);

  renderMenu(data.pages);

  function updatePage() {
    const id = window.location.hash.substring(1) || "home";
    renderPage(data, id);
  }
  window.addEventListener("hashchange", updatePage);
  updatePage();
}

init();
