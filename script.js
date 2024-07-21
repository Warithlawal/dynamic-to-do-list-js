document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the new task element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create the remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event listener to the remove button to delete the task
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
        };

        // Append the remove button to the task item and the task item to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when the Enter key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
