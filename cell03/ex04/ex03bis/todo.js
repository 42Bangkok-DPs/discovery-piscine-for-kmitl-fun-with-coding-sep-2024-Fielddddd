$(document).ready(function() {
    loadTodos();

    $('#addTodo').on('click', function() {
        // Prompt user for new To-Do item
        const newTodo = prompt("allow the user to fill in a new TO DO:");
        
        if (newTodo && newTodo.trim() !== "") {
            // Create a new list item
            const listItem = $('<li>').text(newTodo);

            // Add event listener to remove item on click
            listItem.on('click', function() {
                if (confirm(`you want to remove that TO DO "${newTodo}" ?`)) {
                    $(this).remove();
                    saveTodos();
                }
            });

            // Insert new item at the top of the list
            $('#todoList').prepend(listItem);
            
            // Save the updated list to cookies
            saveTodos();
        }
    });

    function saveTodos() {
        const todos = $('#todoList li').map(function() {
            return $(this).text();
        }).get();
        document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todos='));
        
        if (todoCookie) {
            const todos = JSON.parse(todoCookie.split('=')[1]);

            for (const todo of todos) {
                const listItem = $('<li>').text(todo);

                listItem.on('click', function() {
                    if (confirm(`you want to remove that TO DO "${todo}" ?`)) {
                        $(this).remove();
                        saveTodos();
                    }
                });

                $('#todoList').append(listItem);
            }
        }
    }
});
