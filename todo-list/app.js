// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// FUNCTIONS
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
        todo.remove();
    }
};

// EVENT LISTENERS
todoButton.addEventListener("click", handleAddTodo);
todoList.addEventListener("click", handleCheckDeleteTodo);
