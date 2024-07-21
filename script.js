document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
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
        removeButton.classList.add('remove-btn'); // Using classList.add to add the class name

        // Add event listener to the remove button to delete the task
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the task item, then append the task item to the task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";

        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add task when the Enter key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});
