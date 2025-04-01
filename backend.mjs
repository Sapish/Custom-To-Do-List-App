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

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }
        listItem.appendChild(taskText);

        const editTaskButton = document.createElement("button");
        editTaskButton.textContent = "Edit";
        editTaskButton.addEventListener("click", editTask);
        listItem.appendChild(editTaskButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteTask);
        listItem.appendChild(deleteButton);
        listOfTasks.appendChild(listItem);
    });
}

function addTask(event) {
    event.preventDefault();
    const text = inputTask.value.trim();
    if (text === "") {
        return;
    }
    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    todoForm.reset();
}

function toggleTaskCompletion(event) {
    const listItem = event.target.parentElement;
    const taskId = listItem.dataset.id;
    const task = task.find(t => t.id === taskId);
    if (task) {
        task.completed = event.target.checked;
        saveTasks();
        renderTasks();
    }
}

function editTask(event) {
    const listItem = event.target.parentElement;
    const taskId = listItem.dataset.id;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newText = prompt("Edit task: ", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(event) {
    const listItem = event.target.parentElement;
    const taskId = listItem.dataset.id;
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
}

todoForm.addEventListener("submit", addTask);
loadTasks();
renderTasks();