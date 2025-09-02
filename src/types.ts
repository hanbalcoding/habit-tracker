export interface Habit {
  id: string;
  name: string;
  category: string;
  frequency: 'daily' | 'weekly';
  targetPerWeek?: number; // 주당 목표 횟수 (주간 선택시)
  color: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  note?: string;
}

export interface Stats {
  completedToday: number;
  totalHabits: number;
  currentStreak: number;
  completionRate: number;
}