document.addEventListener("DOMContentLoaded", function () {
  // Load tasks from local storage
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("newTask");
  var taskText = taskInput.value.trim();

  if (taskText === "") return;

  var tasks = getTasksFromLocalStorage();

  var newTask = {
    text: taskText,
    completed: false,
    date: formatDate(new Date()),
  };

  tasks.push(newTask);

  saveTasksToLocalStorage(tasks);
  loadTasks();
  taskInput.value = "";
}

function loadTasks() {
  var tasks = getTasksFromLocalStorage();
  var taskList = document.getElementById("tasks");
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    var listItem = document.createElement("li");

    listItem.innerHTML = `
          <div class="task">
              <input type="checkbox" ${
                task.completed ? "checked" : ""
              } onchange="toggleTaskStatus(${index})">
              <span>${task.text}</span>
              <span>${task.date}</span>
              <div class="taskActions">
                  <button onclick="editTask(${index})">Edit</button>
                  <button onclick="deleteTask(${index})">Delete</button>
              </div>
          </div>
      `;

    taskList.appendChild(listItem);
  });
}

function toggleTaskStatus(index) {
  var tasks = getTasksFromLocalStorage();
  tasks[index].completed = !tasks[index].completed;

  saveTasksToLocalStorage(tasks);
  loadTasks();
}

function editTask(index) {
  var tasks = getTasksFromLocalStorage();
  var newText = prompt("Edit task:", tasks[index].text);

  if (newText !== null) {
    tasks[index].text = newText;
    saveTasksToLocalStorage(tasks);
    loadTasks();
  }
}

function deleteTask(index) {
  var tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);

  saveTasksToLocalStorage(tasks);
  loadTasks();
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
