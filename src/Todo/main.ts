import './style.css';
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
                <h1>Todo List</h1>
                <form id="add-task-form">
                    <input type="text" id="task-input" placeholder="Add a new task" />
                    <button type="submit">Add Task</button>
                </form>
                <div>
                    <input type="number" id="task-count" placeholder="Number of tasks to fetch" min="1" />
                    <button id="fetch-tasks">Fetch Tasks from API</button>
                </div>
                <p id="message"></p>
                <todo-list></todo-list>
            </div>
        `;

        const addTaskForm = document.querySelector<HTMLFormElement>('#add-task-form');
        const taskInput = document.querySelector<HTMLInputElement>('#task-input');
        const todoList = document.querySelector<TodoList>('todo-list');
        const taskCountInput = document.querySelector<HTMLInputElement>('#task-count');
        const fetchTasksButton = document.querySelector<HTMLButtonElement>('#fetch-tasks');
        const messageElement = document.querySelector<HTMLParagraphElement>('#message');

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
                        todoList.addTask(task.todo);
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
