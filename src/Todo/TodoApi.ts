// src/api.ts

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export async function fetchTasksFromAPI(count: number): Promise<Todo[]> {
    const response = await fetch(`https://dummyjson.com/todos?limit=${count}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks from API');
    }
    const data = await response.json();
    return data.todos as Todo[];
}
