//define UI elements

let form = document.querySelector("#task_form");
let taskInput = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");

// define event listener

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTaskList);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTask);

// define functions

//add task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Add a task");
    } else {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value + " "));
        taskList.appendChild(li);
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        li.appendChild(link);

        //local storage
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }
}

//remove task

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are You Sure?")) {
            let element = e.target.parentElement;
            element.remove();
            // console.log(e.target);
            removeFromLS(element);
        }
    }
}

//clear task list

function clearTaskList() {
    taskList.innerHTML = "";
    localStorage.clear();
}

//filter taskList

function filterTask(e) {
    let text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

//local store function

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        taskList.appendChild(li);
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        li.appendChild(link);
    });
}

//remove task form LS
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
