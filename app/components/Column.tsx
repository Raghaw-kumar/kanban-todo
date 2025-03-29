"use client";

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Column as ColumnType, Task } from '../types/kanban';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string, title: string, description: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteColumn: (columnId: string) => void;
}

export function Column({
  column,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDeleteColumn,
}: ColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle, newTaskDescription);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{column.title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteColumn(column.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div ref={setNodeRef}>
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
      </div>

      {isAddingTask ? (
        <div className="mt-4">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title"
            className="mb-2"
          />
          <Textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task description"
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleAddTask}>
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      )}
    </div>
  );
}