import { TodoItem } from "./TodoItem";

export class TodoList extends HTMLElement {
    private completedTasksLabel: HTMLSpanElement;
    private completedTasksCount: number = 0;
    private list: HTMLUListElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'todo-list');

        this.list = document.createElement('ul');
        wrapper.appendChild(this.list);

        this.completedTasksLabel = document.createElement('span');
        this.completedTasksLabel.textContent = `Completed Tasks: 0`;
        wrapper.appendChild(this.completedTasksLabel);

        this.shadowRoot?.appendChild(wrapper);
    }

    addTask(task: string, fromAPI: boolean = false) {
        const todoItem = document.createElement('todo-item') as TodoItem;
        todoItem.setAttribute('content', task);
        if (fromAPI) {
            todoItem.classList.add('api-task');  // Apply different style for API tasks
        } else {
            todoItem.classList.add('manual-task');  // Add class for manual tasks
        }

        const listItem = document.createElement('li');
        listItem.appendChild(todoItem);

        todoItem.addEventListener('task-toggled', (event: Event) => {
            const customEvent = event as CustomEvent<{ checked: boolean }>;
            const isChecked = customEvent.detail.checked;
            this.updateCompletedTasks(isChecked ? 1 : -1);
        });

        todoItem.addEventListener('remove-task', (event: Event) => {
            const customEvent = event as CustomEvent<{ checked: boolean }>;
            const wasChecked = customEvent.detail.checked;
            if (wasChecked) {
                this.updateCompletedTasks(-1);
            }
            listItem.remove();
        });

        this.list.appendChild(listItem);
    }

    updateCompletedTasks(change: number) {
        this.completedTasksCount += change;
        this.completedTasksLabel.textContent = `Completed Tasks: ${this.completedTasksCount}`;
    }

    deleteAllTasks() {
        const tasks = this.list.querySelectorAll('li');
        tasks.forEach(task => {
            const checkbox = task.querySelector('todo-item input[type="checkbox"]') as HTMLInputElement;
            if (checkbox && checkbox.checked) {
                this.updateCompletedTasks(-1);
            }
            task.remove();
        });
    }

    deleteManualTasks() {
        const manualTasks = this.list.querySelectorAll('li .manual-task');
        manualTasks.forEach(task => {
            const listItem = task.closest('li');
            if (listItem) {
                const checkbox = listItem.querySelector('todo-item input[type="checkbox"]') as HTMLInputElement;
                if (checkbox && checkbox.checked) {
                    this.updateCompletedTasks(-1);
                }
                listItem.remove();
            }
        });
    }

    deleteApiTasks() {
        const apiTasks = this.list.querySelectorAll('li .api-task');
        apiTasks.forEach(task => {
            const listItem = task.closest('li');
            if (listItem) {
                const checkbox = listItem.querySelector('todo-item input[type="checkbox"]') as HTMLInputElement;
                if (checkbox && checkbox.checked) {
                    this.updateCompletedTasks(-1);
                }
                listItem.remove();
            }
        });
    }
}

customElements.define('todo-list', TodoList);
