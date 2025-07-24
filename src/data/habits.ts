import { 
  BookOpen, 
  Dumbbell, 
  Calculator, 
  PenTool, 
  NotebookPen, 
  Brain 
} from 'lucide-react';

export const habitData = [
  {
    id: 'hungarian',
    name: 'Learn Hungarian',
    duration: '45 min',
    size: 'medium' as const,
    color: 'habit-blue',
    icon: BookOpen
  },
  {
    id: 'exercise', 
    name: 'Do Exercise',
    duration: '30 min',
    size: 'medium' as const,
    color: 'habit-orange',
    icon: Dumbbell
  },
  {
    id: 'algebra',
    name: 'Revise Linear Algebra', 
    duration: '90 min',
    size: 'large' as const,
    color: 'habit-purple',
    icon: Calculator
  },
  {
    id: 'story',
    name: 'Write a Short Story',
    duration: '60 min', 
    size: 'large' as const,
    color: 'habit-green',
    icon: PenTool
  },
  {
    id: 'diary',
    name: 'Write a Diary',
    duration: '15 min',
    size: 'small' as const,
    color: 'habit-rose',
    icon: NotebookPen
  },
  {
    id: 'meditation',
    name: 'Five-Minute Meditation',
    duration: '5 min',
    size: 'small' as const,
    color: 'habit-teal',
    icon: Brain
  }
];