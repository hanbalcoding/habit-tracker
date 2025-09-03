import { formatDate, getToday, getWeekDaysFromMonday, getDayName } from './dateHelpers';

// 날짜 테스트 함수
export const testDates = () => {
  console.log('=== 날짜 테스트 시작 ===');
  
  // 현재 시간 정보
  const now = new Date();
  console.log('현재 Date 객체:', now);
  console.log('현재 시간 (toString):', now.toString());
  console.log('현재 시간 (toISOString):', now.toISOString());
  console.log('현재 시간 (toLocaleDateString):', now.toLocaleDateString('ko-KR'));
  
  // formatDate 테스트
  console.log('\n--- formatDate 테스트 ---');
  console.log('formatDate(now):', formatDate(now));
  console.log('getToday():', getToday());
  
  // 요일 확인
  console.log('\n--- 요일 확인 ---');
  console.log('getDay() (0=일, 3=수):', now.getDay());
  console.log('getDayName(today):', getDayName(getToday()));
  
  // 주간 날짜 확인
  console.log('\n--- 주간 날짜 (월-일) ---');
  const weekDays = getWeekDaysFromMonday();
  weekDays.forEach((date, index) => {
    const dayName = getDayName(date);
    const isToday = date === getToday();
    console.log(`${index}: ${date} (${dayName}) ${isToday ? '← 오늘' : ''}`);
  });
  
  // 시간대 확인
  console.log('\n--- 시간대 정보 ---');
  console.log('Timezone offset (분):', now.getTimezoneOffset());
  console.log('Timezone offset (시간):', -now.getTimezoneOffset() / 60);
  
  console.log('=== 테스트 종료 ===');
};

// 자동 실행
if (typeof window !== 'undefined') {
  (window as any).testDates = testDates;
}