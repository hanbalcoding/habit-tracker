import { useState, useEffect } from 'react';
import type { Habit, CheckIn, Stats } from '../types';
import { storage } from '../utils/storage';
import { getToday, getLastNDays } from '../utils/dateHelpers';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const habits = storage.getHabits();
    // 최신 습관이 먼저 오도록 정렬 (createdAt 기준 내림차순)
    const sortedHabits = habits.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setHabits(sortedHabits);
    setCheckIns(storage.getCheckIns());
    setLoading(false);
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    storage.addHabit(newHabit);
    loadData();
  };

  const deleteHabit = (id: string) => {
    storage.deleteHabit(id);
    loadData();
  };

  const toggleCheckIn = (habitId: string, date: string = getToday()) => {
    if (import.meta.env.DEV) {
      console.log('🔍 toggleCheckIn 호출:', { habitId, date, defaultDate: getToday() });
    }
    storage.toggleCheckIn(habitId, date);
    loadData();
  };

  const isCheckedIn = (habitId: string, date: string): boolean => {
    return checkIns.some(c => c.habitId === habitId && c.date === date);
  };

  const getHabitStreak = (habitId: string): number => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (isCheckedIn(habitId, dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };

  const getStats = (): Stats => {
    const today = getToday();
    const todayCheckIns = checkIns.filter(c => c.date === today);
    
    let overallStreak = 0;
    const date = new Date();
    
    while (overallStreak < 365) {
      const dateStr = date.toISOString().split('T')[0];
      const dayCheckIns = checkIns.filter(c => c.date === dateStr);
      
      if (habits.length > 0 && dayCheckIns.length === habits.length) {
        overallStreak++;
        date.setDate(date.getDate() - 1);
      } else if (overallStreak > 0) {
        break;
      } else {
        break;
      }
    }

    const last30Days = getLastNDays(30);
    const totalPossible = habits.length * 30;
    const totalCompleted = last30Days.reduce((acc, date) => {
      return acc + checkIns.filter(c => c.date === date).length;
    }, 0);
    
    return {
      completedToday: todayCheckIns.length,
      totalHabits: habits.length,
      currentStreak: overallStreak,
      completionRate: totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
    };
  };

  return {
    habits,
    checkIns,
    loading,
    addHabit,
    deleteHabit,
    toggleCheckIn,
    isCheckedIn,
    getHabitStreak,
    getStats
  };
};