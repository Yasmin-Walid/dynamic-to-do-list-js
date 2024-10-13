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

              // Add task to the tasks array
              tasks.push(taskText);
              saveTasks(); // Save tasks to Local Storage

              // Create task element in DOM
              createTaskElement(taskText);

              // Clear the task input field
              taskInput.value = "";
          }

          // Attach Event Listeners
          addButton.addEventListener('click', addTask); // Listen for Add Task button click

          taskInput.addEventListener('keypress', function(event) {
              if (event.key === 'Enter') { // Listen for Enter key press in the input field
                  addTask();
              }
          });

          // Invoke the addTask function on DOMContentLoaded
          loadTasks(); // Load tasks from Local Storage when the page loads
      });