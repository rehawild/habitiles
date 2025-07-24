import React, { useState, useEffect } from 'react';
import { XIcon as Icon } from 'lucide-react';
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

const getTodayDateString = (): string => {
  const today = new Date();
  return today.toDateString(); // e.g., "Mon Dec 25 2023"
};

const loadHabitsWithDailyReset = (): HabitWithCompletion[] => {
  try {
    const storedHabits = localStorage.getItem('dailyHabits');
    const storedDate = localStorage.getItem('lastResetDate');
    const todayDate = getTodayDateString();

    // If no stored date or it's a new day, reset all habits
    if (!storedDate || storedDate !== todayDate) {
      const resetHabits = habitData.map(habit => ({ ...habit, isCompleted: false }));
      
      // Save the reset habits and today's date
      localStorage.setItem('dailyHabits', JSON.stringify(resetHabits));
      localStorage.setItem('lastResetDate', todayDate);
      
      return resetHabits;
    }

    // If it's the same day, load the stored habits
    if (storedHabits) {
      return JSON.parse(storedHabits);
    }
  } catch (error) {
    console.error('Error loading habits from localStorage:', error);
  }

  // Fallback to default habits
  return habitData.map(habit => ({ ...habit, isCompleted: false }));
};

export const HabitsGrid: React.FC = () => {
  const [habits, setHabits] = useState<HabitWithCompletion[]>(() => 
    loadHabitsWithDailyReset()
  );

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dailyHabits', JSON.stringify(habits));
    localStorage.setItem('lastResetDate', getTodayDateString());
  }, [habits]);

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