export class TodoItem extends HTMLElement {
    private taskText: HTMLSpanElement;

    constructor() {
        super();

        const container = document.createElement('div');
        container.classList.add('todo-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-item__checkbox');

        this.taskText = document.createElement('span');
        this.taskText.classList.add('todo-item__text');

        checkbox.addEventListener('change', () => {
            this.taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            this.taskText.style.color = checkbox.checked ? '#ff0000' : 'rgba(255, 255, 255, 0.87)';

            this.dispatchEvent(new CustomEvent('task-toggled', {
                detail: { checked: checkbox.checked },
                bubbles: true,
                composed: true,
            }));
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('todo-item__button');
        removeButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('remove-task', {
                detail: { checked: checkbox.checked },
                bubbles: true,
                composed: true,
            }));
            this.remove();
        });

        container.appendChild(checkbox);
        container.appendChild(this.taskText);
        container.appendChild(removeButton);

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(container);

        const style = document.createElement('style');
        style.textContent = `
            .todo-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: transparent;
                margin-bottom: 10px;
                padding: 10px;
                width: 100%;
                max-width: 600px;
                border: 2px solid #fff; /* Added border */
                border-radius: 10px; /* Rounded corners */
            }
            .todo-item__checkbox {
                width: 30px;
                height: 30px;
                margin-right: 10px;
                flex-shrink: 0;
            }
            .todo-item__text {
                flex-grow: 1;
                font-size: 2em;
                padding: 0 10px;
                text-align: left;
                color: rgba(255, 255, 255, 0.87);
            }
            .todo-item__button {
                border-radius: 5px;
                border: 1px solid transparent;
                padding: 10px 20px; /* Increased size */
                background-color: #ff0000;
                color: #fff;
                cursor: pointer;
                flex-shrink: 0;
                transition: background-color 0.25s;
            }
            .todo-item__button:hover {
                background-color: #cc0000;
            }
        `;
        shadow.appendChild(style);
    }

    static get observedAttributes() {
        return ['content'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === 'content' && newValue !== oldValue) {
            this.taskText.textContent = newValue || '';
        }
    }
}

customElements.define('todo-item', TodoItem);
