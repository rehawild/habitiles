import React, { useState } from 'react';
import { Icon } from 'lucide-react';
import { HabitTile } from './HabitTile';
import { habitData } from '../data/habits';

interface HabitWithCompletion {
  id: string;
  name: string;
  duration: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  icon: Icon;
  isCompleted: boolean;
}

export const HabitsGrid: React.FC = () => {
  const [habits, setHabits] = useState<HabitWithCompletion[]>(
    habitData.map(habit => ({ ...habit, isCompleted: false }))
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

  return (
    <div className="habits-container">
      <div className="habits-grid">
        {habits.map((habit) => (
          <HabitTile
            key={habit.id}
            habit={habit}
            isCompleted={habit.isCompleted}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};