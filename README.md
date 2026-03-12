# Kanban Task Management App

A highly interactive Single Page Application (SPA) designed to help individuals and teams organize, track, and manage their tasks efficiently. Built with modern web technologies, this application offers a responsive and intuitive interface for seamless workflow management.

## Key Features

*   **Interactive Drag and Drop:** Seamlessly move tasks between different columns (e.g., To Do, In Progress, Done) to reflect their current status in real-time.
*   **Column Management:** Create custom columns to match your specific workflow needs.
*   **Task Management:** Add new tasks with descriptions, edit existing ones, and delete tasks that are no longer relevant.
*   **Persistent Storage:** All tasks and board configurations are automatically saved to your browser's local storage. This ensures your progress is never lost, even if you close the tab or refresh the page.
*   **Responsive Design:** The interface adapts fluidly to various screen sizes, providing a consistent and optimal user experience on desktop, tablet, and mobile devices.
*   **Real-time Notifications:** Stay informed about important actions, such as task creation or movement, through a built-in notification system.
*   **User Profile Menu:** Interactive dropdown menu for accessing user settings and profile information.

## Benefits

*   **Enhanced Productivity:** By visualizing the workflow, users can easily identify bottlenecks and prioritize tasks effectively.
*   **Improved Organization:** Centralizing tasks in a single, structured workspace reduces clutter and the risk of tasks slipping through the cracks.
*   **Customizable Workflow:** The ability to define custom columns allows the application to adapt to diverse project management methodologies, from simple personal to-do lists to complex team workflows.
*   **No Setup Required:** With data persisting locally in the browser, users can start organizing immediately without the need for account creation or complex database configurations.
*   **Fast and Fluid Interface:** Built with React and optimized for performance, the application provides a smooth, native-like feel.

## Technical Stack

*   **Frontend Framework:** React (v18)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS for rapid, utility-first styling.
*   **Drag and Drop:** `@hello-pangea/dnd` for robust and accessible drag-and-drop interactions.
*   **Language:** JavaScript (ES Modules)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory in your terminal.
3.  Install the necessary dependencies by running:
    ```bash
    npm install
    ```

### Development

To start the local development server with hot-module replacement, run:
```bash
npm run dev
```

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This will generate the built assets in the `dist` directory, ready to be deployed to any static hosting provider.

## Deployment

This application is configured for easy deployment on platforms like Vercel or Netlify. A custom build script ensures successful deployment environments by managing dependency permissions.
