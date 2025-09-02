import React from 'react';
import type { Habit } from '../types';
import { getWeekDaysFromMonday, getDayName } from '../utils/dateHelpers';

interface HabitCardProps {
  habit: Habit;
  isCheckedToday: boolean;
  streak: number;
  onToggle: () => void;
  onDelete: () => void;
  getCheckStatus: (date: string) => boolean;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  isCheckedToday,
  streak,
  onToggle,
  onDelete,
  getCheckStatus
}) => {
  const weekDays = getWeekDaysFromMonday();
  const weekProgress = weekDays.filter(date => getCheckStatus(date)).length;
  
  // 진행률 계산: 매일 습관은 7일 기준, 주간 습관은 목표 횟수 기준
  const progressPercentage = habit.frequency === 'weekly' && habit.targetPerWeek
    ? Math.min((weekProgress / habit.targetPerWeek) * 100, 100)
    : (weekProgress / 7) * 100;

  return (
    <div className="habit-card">
      <div className="habit-header">
        <div className="habit-info">
          <h3>{habit.name}</h3>
          <div className="habit-meta">
            <span className="streak">🔥 {streak}일 연속</span>
            <span className="category">{habit.category}</span>
            {habit.frequency === 'weekly' && habit.targetPerWeek && (
              <span className="target">목표: 주 {habit.targetPerWeek}회</span>
            )}
          </div>
        </div>
        <div className="habit-actions">
          <button
            className={`check-btn ${isCheckedToday ? 'checked' : ''}`}
            onClick={onToggle}
            aria-label={isCheckedToday ? '완료 취소' : '완료 체크'}
          >
            <span>완료</span>
          </button>
          <button
            className="delete-btn"
            onClick={onDelete}
            aria-label="습관 삭제"
            title="삭제"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="week-view">
        {weekDays.map(date => (
          <div
            key={date}
            className={`day-box ${getCheckStatus(date) ? 'checked' : ''}`}
          >
            {getDayName(date)}
          </div>
        ))}
      </div>
    </div>
  );
};