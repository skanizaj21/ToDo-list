import './style.scss';
//import './css/todo-item.scss';
//import './css/todo-list.scss';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';
import { fetchTasksFromAPI, Todo } from './TodoApi';  

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
          <h1 class="todo-app__title">Todo List</h1>
          <h2 class="todo-app__subtitle">Sebastian Kanižaj</h2>
          <form id="add-task-form" class="todo-app__form">
              <input type="text" id="task-input" placeholder="Add a new task" class="todo-app__input" />
              <button type="submit" class="todo-app__submit-button">Add Task</button>
          </form>
          <div class="todo-app__fetch">
              <input type="number" id="task-count" placeholder="Number of tasks to fetch" min="1" class="todo-app__fetch-input" />
              <button id="fetch-tasks" class="todo-app__fetch-button">Fetch Tasks from API</button>
          </div>
          <div class="todo-app__controls">
              <button id="delete-all-tasks" class="todo-app__control-button">Delete All Tasks</button>
              <button id="delete-manual-tasks" class="todo-app__control-button">Delete Manual Tasks</button>
              <button id="delete-api-tasks" class="todo-app__control-button">Delete API Tasks</button>
          </div>
          <p id="message" class="todo-app__message"></p>
          <todo-list class="todo-app__list"></todo-list>
        </div>
      `;

        const addTaskForm = document.querySelector<HTMLFormElement>('#add-task-form');
        const taskInput = document.querySelector<HTMLInputElement>('#task-input');
        const todoList = document.querySelector<TodoList>('todo-list');
        const taskCountInput = document.querySelector<HTMLInputElement>('#task-count');

        const fetchTasksButton = document.querySelector<HTMLButtonElement>('#fetch-tasks');
        const messageElement = document.querySelector<HTMLParagraphElement>('#message');

        const deleteAllTasksButton = document.querySelector<HTMLButtonElement>('#delete-all-tasks');
        const deleteManualTasksButton = document.querySelector<HTMLButtonElement>('#delete-manual-tasks');
        const deleteApiTasksButton = document.querySelector<HTMLButtonElement>('#delete-api-tasks');
        
        if (deleteAllTasksButton && todoList) {
            deleteAllTasksButton.addEventListener('click', () => {
                todoList.deleteAllTasks();
            });
        }
        
        if (deleteManualTasksButton && todoList) {
            deleteManualTasksButton.addEventListener('click', () => {
                todoList.deleteManualTasks();
            });
        }
        
        if (deleteApiTasksButton && todoList) {
            deleteApiTasksButton.addEventListener('click', () => {
                todoList.deleteApiTasks();
            });
        }

        if (addTaskForm && taskInput && todoList) {
            addTaskForm.addEventListener('submit', (event: Event) => {
                event.preventDefault(); 
                const task = taskInput.value.trim();
                if (task) {
                    todoList.addTask(task);
                    taskInput.value = ''; 
                } else {
                    showMessage('No task entered', 'error');
                }
            });
        } else {
            console.error("addTaskForm, taskInput, or todoList is null");
        }

        if (fetchTasksButton && taskCountInput && todoList) {
          fetchTasksButton.addEventListener('click', async () => {
              const count = parseInt(taskCountInput.value.trim(), 10);
              if (isNaN(count) || count <= 0) {
                  showMessage('Please enter a valid number of tasks', 'error');
                  return;
              }
      
              try {
                  const tasks: Todo[] = await fetchTasksFromAPI(count);
                  tasks.forEach((task: Todo) => {
                      todoList.addTask(task.todo, true); 
                  });
                  showMessage('Tasks added successfully!', 'success');
              } catch (error) {
                  showMessage('Failed to fetch tasks from API', 'error');
              }
          });
      }

        function showMessage(message: string, type: 'success' | 'error') {
            if (messageElement) {
                messageElement.textContent = message;
                messageElement.style.color = type === 'success' ? 'green' : 'red';
                setTimeout(() => {
                    messageElement.textContent = '';
                }, 3000);
            }
        }
    } else {
        console.error("#app element not found in DOM");
    }
});
