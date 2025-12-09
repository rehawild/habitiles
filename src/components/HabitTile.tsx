import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Habit {
  id: string;
  name: string;
  duration: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  icon: LucideIcon;
}

interface HabitTileProps {
  habit: Habit;
  isCompleted: boolean;
  onToggleComplete: (habitId: string) => void;
  isOverlay?: boolean;
}

// Pure UI Component
const HabitTileBase: React.FC<HabitTileProps & { style?: React.CSSProperties, setNodeRef?: React.Ref<any>, attributes?: any, listeners?: any }> = ({
  habit,
  isCompleted,
  onToggleComplete,
  style,
  setNodeRef,
  attributes,
  listeners,
  isOverlay
}) => {
  const { name, duration, size, color, icon: Icon } = habit;

  const sizeClasses = {
    small: 'habit-tile-small',
    medium: 'habit-tile-medium',
    large: 'habit-tile-large'
  };

  return (
    <button
      ref={setNodeRef}
      style={{
        ...style,
        touchAction: 'none', // Critical for mobile
        cursor: isOverlay ? 'grabbing' : 'grab',
      }}
      {...attributes}
      {...listeners}
      className={`habit-tile ${sizeClasses[size]} ${color} ${isCompleted ? 'habit-tile-completed' : ''}`}
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

export const HabitTile: React.FC<HabitTileProps> = (props) => {
  const { habit, isOverlay } = props;

  if (isOverlay) {
    return <HabitTileBase {...props} />;
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1, // Placeholder effect
  };

  return (
    <HabitTileBase
      {...props}
      setNodeRef={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    />
  );
};
