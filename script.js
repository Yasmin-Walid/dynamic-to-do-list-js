      // Setup Event Listener for Page Load
      document.addEventListener('DOMContentLoaded', function() {
        // Select DOM Elements
        const addButton = document.getElementById('add-task-btn');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');

        // Initialize tasks array from Local Storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Function to save tasks array to Local Storage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Create and append task element to the DOM
        function createTaskElement(taskText) {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            // Create the Remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = "remove-btn";

            // Add click event to remove the task
            removeButton.onclick = function() {
                tasks = tasks.filter(task => task !== taskText); // Remove task from array
                saveTasks(); // Update Local Storage
                taskList.removeChild(taskItem); // Remove task from DOM
            };

            // Append remove button to task item
            taskItem.appendChild(removeButton);
            
            // Append task item to task list
            taskList.appendChild(taskItem);
        }

        // Load tasks from Local Storage on page load
        function loadTasks() {
            tasks.forEach(taskText => {
                createTaskElement(taskText);
            });
        }

        // Create the addTask Function
        function addTask() {
          const taskText = taskInput.value.trim(); // Get task input and trim whitespace
      
          // Check if taskText is not empty ("")
          if (taskText === "") {
              return alert('Please enter a task.');
          }
      
          // Create a new li element and set its textContent to taskText
          const taskItem = document.createElement('li');
          taskItem.textContent = taskText;
      
          // Create a new button element for removing the task
          const removeButton = document.createElement('button');
          removeButton.textContent = "Remove";
          removeButton.className = 'remove-btn'; // Set the class name directly (without classList.add)
      
          // Assign an onclick event to the remove button to remove the li element from taskList
          removeButton.onclick = function() {
              taskList.removeChild(taskItem); // Remove task from DOM
              tasks = tasks.filter(task => task !== taskText); // Remove task from tasks array
              saveTasks(); // Update Local Storage
          };
      
          // Append the remove button to the li element
          taskItem.appendChild(removeButton);
      
          // Append the li element to the taskList
          taskList.appendChild(taskItem);
      
          // Clear the task input field
          taskInput.value = "";
      }

        // Attach Event Listeners
        addButton.addEventListener('click', addTask); // Call addTask when the Add Task button is clicked

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        addTask();
    }
});

        // Load tasks from Local Storage when the page loads
        loadTasks();
    });