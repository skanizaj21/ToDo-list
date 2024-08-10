export class TodoItem extends HTMLElement {
    constructor() {
        super();

        const container = document.createElement('div');

        const taskText = document.createElement('span');
        taskText.textContent = this.getAttribute('content') || '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              taskText.style.textDecoration = 'line-through';
            } else {
              taskText.style.textDecoration = 'none';
            }
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            this.remove();
        });

        container.appendChild(checkbox);
        container.appendChild(taskText);
        container.appendChild(removeButton);

        this.appendChild(container);
    }
}

customElements.define('todo-item', TodoItem);