# Dynamic Kanban Board

A modern, feature-rich Kanban board built with Next.js, TypeScript, and shadcn/ui components. This project demonstrates a production-ready implementation of a drag-and-drop task management system.


## Features

- **Drag & Drop**: Intuitive task management with smooth drag-and-drop functionality
- **Persistent Storage**: All changes are automatically saved to localStorage
- **Dynamic Columns**: Add and remove columns as needed
- **Task Management**: Create, edit, and delete tasks with titles and descriptions
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Mode Support**: Built-in light and dark theme support
- **Keyboard Accessible**: Full keyboard navigation support
- **Touch Support**: Works on mobile and tablet devices

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Drag & Drop**: dnd-kit
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Managing Columns

- Click "Add Column" to create a new column
- Use the "X" button to delete a column
- Default columns: "To Do," "In Progress," and "Done"

### Managing Tasks

- Click "Add Task" within a column to create a new task
- Drag and drop tasks between columns
- Edit tasks by clicking the pencil icon
- Delete tasks using the trash icon
- Each task can have a title and description

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Column.tsx
│   │   └── TaskCard.tsx
│   ├── hooks/
│   │   └── useKanban.ts
│   ├── types/
│   │   └── kanban.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   └── utils.ts
└── public/
```

## Key Components

- `Column.tsx`: Manages individual columns and their tasks
- `TaskCard.tsx`: Handles task display and editing
- `useKanban.ts`: Custom hook for state management
- `kanban.ts`: TypeScript interfaces for the application


## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [dnd kit](https://dndkit.com/) for the drag and drop functionality
- [Lucide](https://lucide.dev/) for the icons
