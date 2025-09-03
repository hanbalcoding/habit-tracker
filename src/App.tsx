import { useState, useEffect } from 'react';
import { useHabits } from './hooks/useHabits';
import { Header } from './components/Header';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { getToday } from './utils/dateHelpers';
import { testDates } from './utils/dateTest';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    habits,
    loading,
    addHabit,
    deleteHabit,
    toggleCheckIn,
    isCheckedIn,
    getHabitStreak,
    getStats
  } = useHabits();

  const today = getToday();
  const stats = getStats();

  // 개발 모드에서 날짜 테스트 실행
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🔍 날짜 디버깅 정보');
      testDates();
      console.log('오늘 날짜 (getToday):', today);
    }
  }, []);

  const handleAddHabit = (habitData: {
    name: string;
    category: string;
    color: string;
    frequency: 'daily' | 'weekly';
  }) => {
    addHabit(habitData);
  };

  const handleDeleteHabit = (id: string) => {
    if (window.confirm('이 습관을 삭제하시겠습니까?')) {
      deleteHabit(id);
    }
  };

  if (loading) {
    return <div className="loading">로딩중...</div>;
  }

  return (
    <div className="app">
      <div className="container">
        <Header stats={stats} />
        
        <button 
          className="add-habit-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + 새로운 습관 추가
        </button>

        {habits.length === 0 ? (
          <div className="empty-state">
            <h2>아직 습관이 없습니다</h2>
            <p>첫 번째 습관을 추가해보세요!</p>
          </div>
        ) : (
          <div className="habits-list">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCheckedToday={isCheckedIn(habit.id, today)}
                streak={getHabitStreak(habit.id)}
                onToggle={() => {
                  const currentDate = getToday();
                  if (import.meta.env.DEV) {
                    console.log('🔍 완료 버튼 클릭:', { habitId: habit.id, currentDate });
                  }
                  toggleCheckIn(habit.id, currentDate);
                }}
                onDelete={() => handleDeleteHabit(habit.id)}
                getCheckStatus={(date) => isCheckedIn(habit.id, date)}
              />
            ))}
          </div>
        )}

        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddHabit}
        />
      </div>
    </div>
  );
}

export default App;