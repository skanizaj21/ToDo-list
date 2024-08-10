import './style.css';
import { addTask, renderTasks } from './todo';

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.querySelector<HTMLInputElement>('#task-input');
  const addTaskForm = document.querySelector<HTMLFormElement>('#add-task-form');
  const taskList = document.querySelector<HTMLUListElement>('#task-list');

  renderTasks(taskList);

  if (addTaskForm && taskInput && taskList) {
    addTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        addTask(task, taskList);
        taskInput.value = '';
      }
    });
  }
});


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Todo List</h1>
    <form id="add-task-form">
      <input type="text" id="task-input" placeholder="Add a new task" />
      <button type="submit">Add Task</button>
    </form>
    <ul id="task-list"></ul>
  </div>
`;