export class TodoItem extends HTMLElement {
    private taskText: HTMLSpanElement;

    constructor() {
        super();

        const container = document.createElement('div');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        this.taskText = document.createElement('span');

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
