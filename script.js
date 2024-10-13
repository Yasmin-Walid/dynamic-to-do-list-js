document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask (){
  const taskText = taskInput.value;

if (taskText === ""){
    return alert ('no task was selected.');
  }
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  
  const removeButton = document.createElement('button');
  removeButton.textContent = "remove";
  removeButton.className = "remove-btn";

  removeButton.onclick = function (){
    taskList.removeChild(taskItem);
  };

  taskItem.appendChild(removeButton);
  taskList.appendChild(taskItem);
  taskInput.value = "";
  saveTasks();
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});



});