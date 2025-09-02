# 습관 트래커 (Habit Tracker)

React + TypeScript로 만든 습관 관리 앱입니다.

## 주요 기능

- ✅ 습관 생성/삭제
- 📊 일일 체크인 시스템
- 🔥 연속 기록 추적
- 📈 주간 진행률 표시
- 💾 로컬 스토리지 저장
- 🎨 카테고리 및 색상 커스터마이징

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 기술 스택

- React 19
- TypeScript
- Vite
- CSS3

## 프로젝트 구조

```
src/
├── components/       # React 컴포넌트
│   ├── Header.tsx
│   ├── HabitCard.tsx
│   └── AddHabitModal.tsx
├── hooks/           # 커스텀 훅
│   └── useHabits.ts
├── utils/           # 유틸리티 함수
│   ├── storage.ts
│   └── dateHelpers.ts
├── types.ts         # TypeScript 타입 정의
├── App.tsx          # 메인 앱 컴포넌트
└── App.css          # 스타일링
```

## 사용 방법

1. "+ 새로운 습관 추가" 버튼을 클릭하여 습관을 추가합니다
2. 원형 체크 버튼을 클릭하여 오늘의 습관을 완료 표시합니다
3. 각 습관 카드에서 주간 진행률과 연속 기록을 확인할 수 있습니다
4. X 버튼을 클릭하여 습관을 삭제할 수 있습니다

## 데이터 저장

모든 데이터는 브라우저의 로컬 스토리지에 자동으로 저장됩니다.