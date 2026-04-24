let tasks = [];
let xp = 0;
let level = 1;

// Load saved data
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

  tasks.push({
    text: text,
    done: false,
    xp: 10
  });

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

// Level system
function updateLevel() {
  level = Math.floor(xp / 50) + 1;
}

// UI update
function updateUI() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.textContent = task.text;

    if (!task.done) {
      li.onclick = () => completeTask(index);
    } else {
      li.style.textDecoration = "line-through";
    }

    const del = document.createElement("button");
    del.textContent = "X";

    del.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(del);
    list.appendChild(li);
  });

  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;

  const progress = (xp % 50) / 50 * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// Save data
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("xp", JSON.stringify(xp));
}

// Theme change
function changeTheme() {
  const theme = document.getElementById("themeSelect").value;

  applyTheme(theme);
  localStorage.setItem("theme", theme);
}

// Theme handling
function applyTheme(theme) {
  let bg = "";

  if (theme === "aot") {
    bg = "url('images/aot.jpg')";
  } else if (theme === "naruto") {
    bg = "url('images/naruto.jpg')";
  } else if (theme === "yourname") {
    bg = "url('images/yourname.jpg')";
  } else if (theme === "apothecary") {
    bg = "url('images/apothecary.jpg')";
  } else {
    bg = "none";
  }

  document.body.style.backgroundImage = bg;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

// Reset everything (keeps theme)
function resetAll() {
  tasks = [];
  xp = 0;
  level = 1;

  localStorage.removeItem("tasks");
  localStorage.removeItem("xp");

  updateUI();
}