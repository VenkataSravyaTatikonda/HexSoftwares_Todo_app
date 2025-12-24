let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveAndRender();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveAndRender();
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="complete" onclick="completeTask(${index})">Complete</button>
                <button class="remove" onclick="removeTask(${index})">Remove</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

renderTasks();
