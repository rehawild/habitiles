import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { HabitTile } from './HabitTile';
import { habitData } from '../data/habits';

interface HabitWithCompletion {
  id: string;
  name: string;
  duration: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  icon: LucideIcon;
  isCompleted: boolean;
}

export const HabitsGrid: React.FC = () => {
  const [habits, setHabits] = useState<HabitWithCompletion[]>(
    habitData.map(habit => ({ ...habit, isCompleted: false }))
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleToggleComplete = (habitId: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? { ...habit, isCompleted: !habit.isCompleted }
          : habit
      )
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (over && active.id !== over.id) {
      setHabits((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeHabit = activeId ? habits.find(h => h.id === activeId) : null;

  return (
    <div className="habits-container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="habits-grid">
          <SortableContext
            items={habits.map(h => h.id)}
            strategy={rectSortingStrategy}
          >
            {habits.map((habit) => (
              <HabitTile
                key={habit.id}
                habit={habit}
                isCompleted={habit.isCompleted}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeHabit ? (
            <HabitTile
              habit={activeHabit}
              isCompleted={activeHabit.isCompleted}
              onToggleComplete={handleToggleComplete}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
