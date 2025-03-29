"use client";

import { useState, useCallback, useEffect } from 'react';
import { KanbanState, Task, Column } from '../types/kanban';

const DEFAULT_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export const useKanban = () => {
  const [state, setState] = useState<KanbanState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kanban-state');
      return saved ? JSON.parse(saved) : { columns: DEFAULT_COLUMNS };
    }
    return { columns: DEFAULT_COLUMNS };
  });

  useEffect(() => {
    localStorage.setItem('kanban-state', JSON.stringify(state));
  }, [state]);

  const addTask = useCallback((columnId: string, title: string, description: string) => {
    setState((prev) => ({
      columns: prev.columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              { id: Date.now().toString(), title, description, columnId },
            ],
          };
        }
        return col;
      }),
    }));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setState((prev) => ({
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      })),
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setState((prev) => ({
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    }));
  }, []);

  const moveTask = useCallback((taskId: string, sourceColId: string, destColId: string) => {
    setState((prev) => {
      const task = prev.columns
        .find((col) => col.id === sourceColId)
        ?.tasks.find((t) => t.id === taskId);

      if (!task) return prev;

      return {
        columns: prev.columns.map((col) => {
          if (col.id === sourceColId) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== taskId),
            };
          }
          if (col.id === destColId) {
            return {
              ...col,
              tasks: [...col.tasks, { ...task, columnId: destColId }],
            };
          }
          return col;
        }),
      };
    });
  }, []);

  const addColumn = useCallback((title: string) => {
    setState((prev) => ({
      columns: [
        ...prev.columns,
        { id: Date.now().toString(), title, tasks: [] },
      ],
    }));
  }, []);

  const deleteColumn = useCallback((columnId: string) => {
    setState((prev) => ({
      columns: prev.columns.filter((col) => col.id !== columnId),
    }));
  }, []);

  return {
    state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addColumn,
    deleteColumn,
  };
};