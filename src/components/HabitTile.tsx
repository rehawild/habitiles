import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface HabitTileProps {
  habit: {
    id: string;
    name: string;
    duration: string;
    size: 'small' | 'medium' | 'large';
    color: string;
    icon: LucideIcon;
  };
  isCompleted: boolean;
  onToggleComplete: (habitId: string) => void;
}

export const HabitTile: React.FC<HabitTileProps> = ({ habit, isCompleted, onToggleComplete }) => {
  const { name, duration, size, color, icon: Icon } = habit;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sizeClasses = {
    small: 'habit-tile-small',
    medium: 'habit-tile-medium', 
    large: 'habit-tile-large'
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`habit-tile touch-none ${sizeClasses[size]} ${color} ${isCompleted ? 'habit-tile-completed' : ''}`}
      onClick={() => onToggleComplete(habit.id)}
      disabled={isCompleted}
      aria-label={`Habit tile: ${name}`}
      type="button"
    >
      <div className="habit-tile-content">
        <div className="habit-icon">
          <Icon size={size === 'large' ? 28 : size === 'medium' ? 24 : 20} />
        </div>
        <div className="habit-text">
          <h3 className="habit-name">{name}</h3>
          <p className="habit-duration">{duration}</p>
        </div>
      </div>
    </button>
  );
};
