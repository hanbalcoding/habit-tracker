import React from 'react';
import type { Stats } from '../types';

interface HeaderProps {
  stats: Stats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  const formattedDate = today.toLocaleDateString('ko-KR', dateOptions);

  return (
    <div className="header">
      <h1>오늘의 습관</h1>
      <p className="date">{formattedDate}</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.completedToday}</div>
          <div className="stat-label">완료</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalHabits}</div>
          <div className="stat-label">전체</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.currentStreak}</div>
          <div className="stat-label">연속일</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">달성률</div>
        </div>
      </div>
    </div>
  );
};