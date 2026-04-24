let tasks = [];
let xp = 0;
let level = 1;

// Load saved data
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const savedXP = JSON.parse(localStorage.getItem("xp"));

  if (savedTasks) tasks = savedTasks;
  if (savedXP !== null) xp = savedXP;

  updateLevel();
  updateUI();
};

// Add task (NOW includes XP value)
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    text: text,
    done: false,
    xp: 10   // default XP per task
  });

  input.value = "";

  saveData();
  updateUI();
}

// Complete task (uses task XP instead of fixed 10)
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

// Reset everything
function resetAll() {
  tasks = [];
  xp = 0;
  level = 1;

  localStorage.clear();
  updateUI();
}