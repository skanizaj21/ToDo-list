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

    addTask(task: string) {
        const todoItem = document.createElement('todo-item') as TodoItem;
        todoItem.setAttribute('content', task);

        const listItem = document.createElement('li');
        listItem.appendChild(todoItem);

        // Listen for the custom events emitted by TodoItem
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
}

customElements.define('todo-list', TodoList);
