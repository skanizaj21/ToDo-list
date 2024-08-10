let tasks: string[] = [];

export function renderTasks(taskListElement: HTMLUListElement | null) {
  if (taskListElement) {
    taskListElement.innerHTML = tasks.map(task => `<li>${task}</li>`).join('');
  }
}

export function addTask(task: string, taskListElement: HTMLUListElement | null) {
  tasks.push(task);
  renderTasks(taskListElement);
}