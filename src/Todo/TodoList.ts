import { TodoItem } from "./TodoItem";

export class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'todo-list');

        const list = document.createElement('ul');
        wrapper.appendChild(list);

        this.shadowRoot?.appendChild(wrapper);
    }

    addTask(task: string) {
        const list = this.shadowRoot?.querySelector('ul');

        if (task && list) {
            const todoItem = document.createElement('todo-item') as TodoItem;
            todoItem.setAttribute('content', task);

            const listItem = document.createElement('li');
            listItem.appendChild(todoItem);

            todoItem.addEventListener('remove-task', () => {
                listItem.remove();
            });

            list.appendChild(listItem);
        }
    }
}

customElements.define('todo-list', TodoList);
