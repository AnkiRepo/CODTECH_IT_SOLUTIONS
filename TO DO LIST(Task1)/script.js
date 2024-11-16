// Select elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const clearTasksButton = document.getElementById("clear-tasks");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
  }
});

// Handle task actions (edit, complete, delete)
taskList.addEventListener("click", (e) => {
  const li = e.target.parentElement;

  if (e.target.classList.contains("edit")) {
    const newTaskText = prompt("Edit your task:", li.firstChild.textContent);
    if (newTaskText) {
      updateTaskInLocalStorage(li.firstChild.textContent, newTaskText);
      li.firstChild.textContent = newTaskText;
    }
  }

  if (e.target.classList.contains("complete")) {
    li.classList.toggle("completed");
  }

  if (e.target.classList.contains("delete")) {
    removeTaskFromLocalStorage(li.firstChild.textContent);
    li.remove();
  }
});

// Clear completed tasks
clearTasksButton.addEventListener("click", () => {
  document.querySelectorAll(".completed").forEach((li) => {
    removeTaskFromLocalStorage(li.firstChild.textContent);
    li.remove();
  });
});

// Functions
function addTask(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <span class="edit">✏️</span>
    <span class="complete">✔️</span>
    <span class="delete">❌</span>
  `;
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

function updateTaskInLocalStorage(oldTask, newTask) {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.indexOf(oldTask);
  if (taskIndex !== -1) {
    tasks[taskIndex] = newTask;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(addTask);
}
