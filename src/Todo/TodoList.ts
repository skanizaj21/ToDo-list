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
            todoItem.classList.add('api-task');
        } else {
            todoItem.classList.add('manual-task');
        }

        const listItem = document.createElement('li');
        listItem.appendChild(todoItem);

        todoItem.addEventListener('task-toggled', (event: Event) => {
            const customEvent = event as CustomEvent<{ checked: boolean }>;
            const isChecked = customEvent.detail.checked;
            console.log(`Task toggled: ${task}, Checked: ${isChecked}`);
            this.updateCompletedTasks(isChecked ? 1 : -1);
        });

        todoItem.addEventListener('remove-task', (event: Event) => {
            const customEvent = event as CustomEvent<{ checked: boolean }>;
            const wasChecked = customEvent.detail.checked;
            console.log(`Task removed: ${task}, Was Checked: ${wasChecked}`);
            if (wasChecked) {
                this.updateCompletedTasks(-1);
            }
            listItem.remove();
            this.updateCompletedTasks(0, true);
        });

        this.list.appendChild(listItem);
    }

    updateCompletedTasks(change: number, recalculate: boolean = false) {
        if (recalculate) {
            const checkedItems = this.list.querySelectorAll('li input[type="checkbox"]:checked');
            console.log('Checked items during recalculation:', checkedItems);
            this.completedTasksCount = checkedItems.length;
            console.log(`Recalculating completed tasks. New count: ${this.completedTasksCount}`);
        } else {
            this.completedTasksCount += change;
            console.log(`Updated completed tasks count by ${change}. New count: ${this.completedTasksCount}`);
        }
        this.completedTasksLabel.textContent = `Completed Tasks: ${this.completedTasksCount}`;
    }

    deleteAllTasks() {
        const tasks = this.list.querySelectorAll('li');
        console.log(`Deleting all tasks. Number of tasks: ${tasks.length}`);
        tasks.forEach(task => {
            console.log(`Deleting task: ${task.textContent}`);
            task.remove();
        });
        this.updateCompletedTasks(0, true);  
    }

    deleteManualTasks() {
        const manualTasks = this.list.querySelectorAll('li .manual-task');
        let tasksDeletedCount = 0;
    
        manualTasks.forEach(task => {
            const listItem = task.closest('li');
            const shadowRoot = (task as HTMLElement).shadowRoot;
            const checkbox = shadowRoot?.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
    
            if (checkbox && checkbox.checked) {
                tasksDeletedCount++;
            }
    
            listItem?.remove();
        });
    
        this.updateCompletedTasks(-tasksDeletedCount);
    }

    deleteApiTasks() {
        const apiTasks = this.list.querySelectorAll('li .api-task');
        let tasksDeletedCount = 0;
    
        apiTasks.forEach(task => {
            const listItem = task.closest('li');
            if (!listItem) {
                console.error(`List item for task not found: ${task.textContent}`);
                return;
            }
    
            const shadowRoot = (task as HTMLElement).shadowRoot;
            const checkbox = shadowRoot?.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
            if (checkbox && checkbox.checked) {
                tasksDeletedCount++; 
            }
            listItem.remove();  
        });
    
        console.log(`Total completed tasks deleted: ${tasksDeletedCount}`);
    
        this.updateCompletedTasks(-tasksDeletedCount);
    }
    
    
    
}

customElements.define('todo-list', TodoList);
