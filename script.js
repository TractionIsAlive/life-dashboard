let tasks = [];
let xp = 0;
let level = 1;

// Load data
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const savedXP = JSON.parse(localStorage.getItem("xp"));
  const savedTheme = localStorage.getItem("theme");

  if (savedTasks) tasks = savedTasks;
  if (savedXP !== null) xp = savedXP;

  if (savedTheme) {
    applyTheme(savedTheme);
    document.getElementById("themeSelect").value = savedTheme;
  }

  updateLevel();
  updateUI();
};

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({ text, done: false, xp: 10 });

  input.value = "";
  saveData();
  updateUI();
}

// Complete task
function completeTask(index) {
  if (!tasks[index].done) {
    tasks[index].done = true;
    xp += tasks[index].xp;

    updateLevel();
    saveData();
    updateUI();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveData();
  updateUI();
}

// Level
function updateLevel() {
  level = Math.floor(xp / 50) + 1;
}

// UI
function updateUI() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (!task.done) {
      li.onclick = () => completeTask(i);
    } else {
      li.style.textDecoration = "line-through";
    }

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(i);
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;

  const progress = (xp % 50) / 50 * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// Save
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", JSON.stringify(xp));
}

// Theme
function changeTheme() {
  const theme = document.getElementById("themeSelect").value;
  applyTheme(theme);
  localStorage.setItem("theme", theme);
}

function applyTheme(theme) {
  document.body.className = "";

  if (theme !== "default") {
    document.body.classList.add(theme);
  }
}

// Reset
function resetAll() {
  tasks = [];
  xp = 0;
  level = 1;

  localStorage.clear();
  updateUI();
}