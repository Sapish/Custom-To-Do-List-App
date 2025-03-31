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