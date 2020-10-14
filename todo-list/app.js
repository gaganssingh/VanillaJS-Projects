// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// FUNCTIONS
checkLocalStorage = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
};

handleGetTodosFromStorage = () => {
    // Check if any previously saved todos exist
    const todos = checkLocalStorage();

    // Display todos from local storage
    todos.forEach((todo) => {
        // create the div container for new todo
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;

        // Add this todo item to the todo container
        todoDiv.appendChild(newTodo);

        // Create todo-completed button
        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        todoDiv.appendChild(completedButton);

        // Create delete-todo completed button
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        todoDiv.appendChild(trashButton);

        // Append tgis new todo container to the ul
        todoList.appendChild(todoDiv);
    });
};

// Save Todos in Local Storage
handleLocalStorage = (todo) => {
    // Check if any previously saved todos exist
    const todos = checkLocalStorage();

    // Add the new todo to local storage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

handleRemovLocalStorage = (todo) => {
    // Check if any previously saved todos exist
    const todos = checkLocalStorage();

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);

    localStorage.setItem("todos", JSON.stringify(todos));
};

// FUNCTIONS
// Handling user interaction
handleAddTodo = (event) => {
    event.preventDefault();

    // create the div container for new todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;

    // Add this todo item to the todo container
    todoDiv.appendChild(newTodo);

    // Add new todo to local storage
    handleLocalStorage(todoInput.value);

    // Create todo-completed button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completedButton);

    // Create delete-todo completed button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);

    // Append tgis new todo container to the ul
    todoList.appendChild(todoDiv);

    // Clear the input box
    todoInput.value = "";
};

handleCheckDeleteTodo = (event) => {
    const item = event.target;

    // Handle todo check-off
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    // Handle todo deletion
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        // Todo remove animation
        todo.classList.add("fall");

        // **** Todo remove animation styling****
        const fall = document.querySelector(".fall");
        const transY = Math.random() * 9;
        const rotateZ = Math.random() * 21;
        fall.style.setProperty("--transY", transY + "rem");
        fall.style.setProperty("--rotateZ", rotateZ + "deg");
        // ***************************************

        // Remove todo from local storage
        handleRemovLocalStorage(todo);

        // Remove the actual DOM node after animation ends
        todo.addEventListener("transitionend", () => todo.remove());
    }
};

handleFilterTodo = (event) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "not-completed":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
};

// EVENT LISTENERS
// On first app startup, get and display todos from the local storage
document.addEventListener("DOMContentLoaded", handleGetTodosFromStorage);

// EVENT LISTENERS
// User actions
todoButton.addEventListener("click", handleAddTodo);
todoList.addEventListener("click", handleCheckDeleteTodo);
filterOption.addEventListener("click", handleFilterTodo);
