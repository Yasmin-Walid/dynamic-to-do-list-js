document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
      const taskItem = document.createElement('li');
      taskItem.textContent = taskText;

      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";

      removeButton.onclick = function() {
          tasks = tasks.filter(task => task !== taskText); 
          saveTasks(); 
          taskList.removeChild(taskItem); 
      };

      taskItem.appendChild(removeButton);
      
  
      taskList.appendChild(taskItem);
  }


  function loadTasks() {
      tasks.forEach(taskText => {
          createTaskElement(taskText);
      });
  }

 
  function addTask() {
      const taskText = taskInput.value.trim(); 

      if (taskText === "") {
          return alert('Please enter a task.');
      }

      tasks.push(taskText);
      saveTasks(); 

      createTaskElement(taskText);

      taskInput.value = "";
  }

  addButton.addEventListener('click', addTask); 

  taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addTask();
      }
  });

  loadTasks();
});