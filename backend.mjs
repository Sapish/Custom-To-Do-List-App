console.log("APP");

const todoForm = document.getElementById("todoForm");
const inputTask = document.getElementById("inputTask");
const listOfTasks = document.getElementById("listOfTasks");

let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    listOfTasks.innerHTML = "";
    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", toggleTaskCompletion);
        listItem.appendChild(checkbox);

        
    })
}

loadTasks();
renderTasks();