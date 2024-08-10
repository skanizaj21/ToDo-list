export class TodoList extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'todo-list');

        const list = document.createElement('ul');
        wrapper.appendChild(list);

        this.shadowRoot?.appendChild(wrapper);
    }

    addTaks(task: any){
        const list = this.shadowRoot?.querySelector('ul');

        if(task){
            const todoItem = document.createElement('todo-item');
            todoItem.setAttribute('content', task);

            const listItem = document.createElement('li');
            listItem.appendChild(todoItem);

            list?.appendChild(listItem);
        }
    }
}