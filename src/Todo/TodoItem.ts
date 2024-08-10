import './css/todo-item.css';

export class TodoItem extends HTMLElement {
    private taskText: HTMLSpanElement;

    constructor() {
        super();

        const container = document.createElement('div');

        this.taskText = document.createElement('span');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            this.taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            this.remove();
        });

        container.appendChild(checkbox);
        container.appendChild(this.taskText);
        container.appendChild(removeButton);

        this.attachShadow({ mode: 'open' }).appendChild(container);
    }

    static get observedAttributes() {
        return ['content'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === 'content' && newValue !== oldValue) {
            this.taskText.textContent = newValue || '';
            console.log('Updated task content:', this.taskText.textContent);
        }
    }
}

customElements.define('todo-item', TodoItem);