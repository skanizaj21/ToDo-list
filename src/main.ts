import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Todo List</h1>
    <form id="add-task-form">
      <input type="text" id="task-input" placeholder="Add a new task" />
      <button type="submit">Add Task</button>
    </form>
    <ul id="task-list"></ul>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
