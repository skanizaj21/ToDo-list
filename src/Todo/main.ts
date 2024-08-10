import './style.css';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';

if (!customElements.get('todo-item')) {
  customElements.define('todo-item', TodoItem);
}

if (!customElements.get('todo-list')) {
  customElements.define('todo-list', TodoList);
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (app) {
    app.innerHTML = `
      <div>
        <h1>Todo List</h1>
        <form id="add-task-form">
          <input type="text" id="task-input" placeholder="Add a new task" />
          <button type="submit">Add Task</button>
        </form>
        <todo-list></todo-list>
      </div>
    `;

    const addTaskForm = document.querySelector<HTMLFormElement>('#add-task-form');
    const taskInput = document.querySelector<HTMLInputElement>('#task-input');
    const todoList = document.querySelector<TodoList>('todo-list');

    if (addTaskForm && taskInput && todoList) {
      addTaskForm.addEventListener('submit', (event: Event) => {
        event.preventDefault(); 
        const task = taskInput.value.trim();
        if (task) {
          console.log("Task:", task); 
          todoList.addTask(task); 
          taskInput.value = ''; 
        } else {
          console.log("No task"); 
        }
      });
    } else {
      console.error("addTaskForm taskInput or todoList is null"); 
    }
  }
});
