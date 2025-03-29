"use client";

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Column } from './components/Column';
import { useKanban } from './hooks/useKanban';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export default function Home() {
  const {
    state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addColumn,
    deleteColumn,
  } = useKanban();

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const sourceColId = active.data.current?.sortable.containerId;
    const destColId = over.id as string;

    if (sourceColId !== destColId) {
      moveTask(taskId, sourceColId, destColId);
    }
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          {isAddingColumn ? (
            <div className="flex gap-2">
              <Input
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Column title"
                className="w-48"
              />
              <Button onClick={handleAddColumn}>Add</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddingColumn(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsAddingColumn(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Column
            </Button>
          )}
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {state.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onDeleteColumn={deleteColumn}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}