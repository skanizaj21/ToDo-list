# ToDo-list

## Description

This is a simple and responsive ToDo List web application built using HTML, CSS (SCSS), and TypeScript. The application allows users to add tasks, fetch tasks from an API, and delete tasks. Tasks can be categorized as either manual or fetched from an API, and the application keeps track of the number of completed tasks.

## Features

- **Add Tasks:** Users can manually add tasks to the list.
- **Fetch Tasks:** Users can fetch a specified number of tasks from an external API.
- **Delete Tasks:** Users can delete all tasks, only manual tasks, or only API-fetched tasks.
- **Task Completion Tracking:** The application displays the number of completed tasks.
- **Responsive Design:** The application is responsive and works well on various screen sizes.
- **Custom Elements:** The app is built using custom elements (`<todo-item>` and `<todo-list>`) for modularity and reusability.
- **CSS Flexbox:** Used for layout and alignment of elements in the UI.
- **SCSS:** Styles are written in SCSS for better modularity and maintainability.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ToDo-list.git

2. **Navigate to the project directory:**
   
    ```bash
   cd ToDo-list

3. **Install dependencies:**

   ```bash
   npm install

4. **Start the development server:**

   ```bash
   npm run dev

This will start the development server and open the application in your default web browser. The server will automatically reload the page whenever you make changes to the source code.

5. **Start the development server:**

   ```bash
   npm run build

## Project Structure

## Project Structure

- `public/`: Contains static assets like the `vite.svg`.
- `src/`: Contains the source code of the application.
  - `main.ts`: Main entry point that initializes the application.
  - `style.scss`: Global styles for the application.
  - `TodoApi.ts`: Handles fetching tasks from the API.
  - `TodoItem.ts`: Defines the `<todo-item>` custom element.
  - `TodoList.ts`: Defines the `<todo-list>` custom element.
  - `vite-env.d.ts`: TypeScript environment configuration for Vite.
  - `typescript.svg`: SVG icon for TypeScript.
- `.gitignore`: Specifies files and directories that Git should ignore.
- `index.html`: The main HTML file that loads the application.
- `package-lock.json`: Automatically generated file that locks the version of dependencies.
- `tsconfig.json`: TypeScript configuration file.

## Usage

### Adding Tasks
1. Type a task in the "Add a new task" input field.
2. Click the "Add Task" button.

### Fetching Tasks
1. Enter the number of tasks to fetch in the "Number of tasks to fetch" input field.
2. Click the "Fetch Tasks from API" button.

### Deleting Tasks
- **Delete All Tasks**: Click the "Delete All Tasks" button to remove all tasks from the list.
- **Delete Manual Tasks**: Click the "Delete Manual Tasks" button to remove only the manually added tasks.
- **Delete API Tasks**: Click the "Delete API Tasks" button to remove only the tasks fetched from the API.

### Tracking Completed Tasks
- Click the checkbox next to a task to mark it as completed.
- The "Completed Tasks" counter at the top of the list will update accordingly.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Author

**Sebastian Kanižaj**
