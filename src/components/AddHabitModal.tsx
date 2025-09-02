import React, { useState } from 'react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: { name: string; category: string; color: string; frequency: 'daily' | 'weekly'; targetPerWeek?: number }) => void;
}

const COLORS = [
  '#667eea', '#764ba2', '#f97316', '#10b981', 
  '#ef5350', '#06b6d4', '#8b5cf6', '#ec4899'
];

const CATEGORIES = [
  '건강', '운동', '학습', '독서', 
  '명상', '취미', '업무', '기타'
];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('건강');
  const [color, setColor] = useState(COLORS[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [targetPerWeek, setTargetPerWeek] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({ 
        name, 
        category, 
        color, 
        frequency,
        targetPerWeek: frequency === 'weekly' ? targetPerWeek : undefined
      });
      setName('');
      setCategory('건강');
      setColor(COLORS[0]);
      setFrequency('daily');
      setTargetPerWeek(3);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>새 습관 만들기</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>습관 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 물 8잔 마시기"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>색상</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>빈도</label>
            <div className="frequency-options">
              <button
                type="button"
                className={`freq-btn ${frequency === 'daily' ? 'active' : ''}`}
                onClick={() => setFrequency('daily')}
              >
                매일
              </button>
              <button
                type="button"
                className={`freq-btn ${frequency === 'weekly' ? 'active' : ''}`}
                onClick={() => setFrequency('weekly')}
              >
                주간
              </button>
            </div>
          </div>

          {frequency === 'weekly' && (
            <div className="form-group">
              <label>주당 목표 횟수</label>
              <select 
                value={targetPerWeek} 
                onChange={(e) => setTargetPerWeek(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>주 {num}회</option>
                ))}
              </select>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              취소
            </button>
            <button type="submit" className="btn-submit">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};