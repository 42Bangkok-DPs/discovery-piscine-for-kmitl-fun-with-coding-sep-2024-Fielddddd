document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    // Prompt user for new To-Do item
    const newTodo = prompt("allow the user to fill in a new TO DO:");
    
    if (newTodo && newTodo.trim() !== "") {
        // Create a new list item
        const todoList = document.getElementById('todoList');
        const listItem = document.createElement('li');
        listItem.textContent = newTodo;

        // Add event listener to remove item on click
        listItem.addEventListener('click', function() {
            if (confirm(`you want to remove that TO DO "${newTodo}" ?`)) {
                this.remove();
                saveTodos();
            }
        });

        // Insert new item at the top of the list
        todoList.insertBefore(listItem, todoList.firstChild);
        
        // Save the updated list to cookies
        saveTodos();
    }
}

function saveTodos() {
    const todoList = document.getElementById('todoList');
    const todos = [];
    for (const item of todoList.children) {
        todos.push(item.textContent);
    }
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    
    if (todoCookie) {
        const todos = JSON.parse(todoCookie.split('=')[1]);
        const todoList = document.getElementById('todoList');
        
        for (const todo of todos) {
            const listItem = document.createElement('li');
            listItem.textContent = todo;

            listItem.addEventListener('click', function() {
                if (confirm(`คุณต้องการลบ "${todo}" หรือไม่?`)) {
                    this.remove();
                    saveTodos();
                }
            });
            
            todoList.appendChild(listItem);
        }
    }
}
