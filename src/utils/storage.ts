import type { Habit, CheckIn } from '../types';

const HABITS_KEY = 'habit_tracker_habits';
const CHECKINS_KEY = 'habit_tracker_checkins';

export const storage = {
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  },

  getCheckIns: (): CheckIn[] => {
    const data = localStorage.getItem(CHECKINS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCheckIns: (checkIns: CheckIn[]) => {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkIns));
  },

  addHabit: (habit: Habit) => {
    const habits = storage.getHabits();
    habits.push(habit);
    storage.saveHabits(habits);
  },

  deleteHabit: (id: string) => {
    const habits = storage.getHabits().filter(h => h.id !== id);
    storage.saveHabits(habits);
    
    const checkIns = storage.getCheckIns().filter(c => c.habitId !== id);
    storage.saveCheckIns(checkIns);
  },

  toggleCheckIn: (habitId: string, date: string) => {
    const checkIns = storage.getCheckIns();
    const existingIndex = checkIns.findIndex(
      c => c.habitId === habitId && c.date === date
    );

    if (existingIndex >= 0) {
      checkIns.splice(existingIndex, 1);
    } else {
      checkIns.push({
        id: Date.now().toString(),
        habitId,
        date,
        completed: true
      });
    }

    storage.saveCheckIns(checkIns);
  }
};