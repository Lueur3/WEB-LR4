const projects = [
  {
    id: 1,
    img: "images/blue-line.png",
    title: "Название первой задачи",
    date: "16 июля 2023 года",
    respons: "Сигорских Дмитрий",
    category: "Синий проект",
  },
  {
    id: 2,
    img: "images/green-line.png",
    title: "Название второй задачи",
    date: "19 июля 2023 года",
    respons: "Сигорских Дмитрий",
    category: "Зелёный проект",
  },
  {
    id: 3,
    img: "images/red-line.png",
    title: "Название третей задачи",
    date: "08 августа 2023 года",
    respons: "Сигорских Дмитрий",
    category: "Красный проект",
  },
  {
    id: 4,
    img: "images/pink-line.png",
    title: "Название четвертой задачи",
    date: "19 декабря 2023 года",
    respons: "Сигорских Дмитрий",
    category: "Розовый проект",
  },
];

const tasksContainer = document.querySelector(".tasks");

function renderTasks(list) {

  tasksContainer.innerHTML = "";

  if (list.length === 0) {
    tasksContainer.innerHTML = `
      <div class="no-results">
        <p>По вашему запросу ничего не найдено.</p>
      </div>
    `;
    return;
  }

  list.forEach((project, index) => {
    const delay = index * 0.1;
    const taskHtml = `
            <article class="task-card" style="animation-delay: ${delay}s">
                <img src="${project.img}" alt="Color line" />
                <div class="card-body">
                    <h2>${project.title}</h2>
                    <p class="card-description">Описание задачи</p>
                    <dl class="card-details">
                        <div class="card-details-due">
                            <dt>Истекает:</dt>
                            <dd>${project.date}</dd>
                        </div>
                        <div class="card-details-respons">
                            <dt>Ответственный:</dt>
                            <dd>${project.respons}</dd>
                        </div>
                    </dl>
                </div>
            </article>
        `;
    tasksContainer.insertAdjacentHTML("beforeend", taskHtml);
  });
}

renderTasks(projects);

const MenuItems = document.querySelectorAll(".sidebar-nav li");

for (let item of MenuItems) {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    for (let i of MenuItems) {
      i.classList.remove("active");
    }

    item.classList.add("active");

    const category = item.textContent.trim();

    if (category === "Все проекты") {
      renderTasks(projects);
    } else {
      const filteredTasks = projects.filter(
        (project) => project.category == category
      );
      renderTasks(filteredTasks);
    }
  });
}

const searchInput = document.querySelector(".search-bar input");

searchInput.addEventListener("input", function () {
  const value = searchInput.value.trim().toLowerCase();

  const menuItems = document.querySelectorAll(".sidebar-nav li");

  for (let item of menuItems) {
    item.classList.remove("active");
  }

  if (value === "") {
    renderTasks(projects);
    menuItems[0].classList.add("active");
    return;
  }

  const foundProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(value);
  });

  renderTasks(foundProjects);
});

const months = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

function parseDate(dateString) {
  const parts = dateString.split(" ");

  const day = parseInt(parts[0]);
  const month = months[parts[1]];
  const year = parseInt(parts[2]);

  return new Date(year, month, day).getTime();
}

const sortItems = document.querySelectorAll(".sort-options li");
const currentSortLabel = document.querySelector("#current-sort");
const sortDropdown = document.querySelector(".sort-dropdown");


for (let item of sortItems) {
  item.addEventListener("click", () => {
    sortItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
    currentSortLabel.textContent = item.textContent;
    sortDropdown.removeAttribute("open");

    const sortType = item.getAttribute("data-sort");

    if (sortType === "default") {
      projects.sort((a, b) => a.id - b.id);
    } else if (sortType === "asc") {
      projects.sort((a, b) => {
        return parseDate(a.date) - parseDate(b.date);
      });
    } else if (sortType === "desc") {
      projects.sort((a, b) => {
        return parseDate(b.date) - parseDate(a.date);
      });
    }

    renderTasks(projects);
  });
}
