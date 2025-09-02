export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getToday = (): string => {
  return formatDate(new Date());
};

export const getLastNDays = (n: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  
  return dates;
};

export const getDayName = (dateString: string): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);
  return days[date.getDay()];
};

export const getDayNameShort = (dateString: string): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);
  return days[date.getDay()];
};

// 월요일부터 시작하는 주간 날짜 가져오기
export const getWeekDaysFromMonday = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  
  // 월요일로 이동 (일요일은 0이므로 특별 처리)
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + daysToMonday);
  
  // 월요일부터 일요일까지 7일
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(formatDate(date));
  }
  
  return dates;
};

export const getMonthYear = (date: Date): string => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  return `${date.getFullYear()}년 ${months[date.getMonth()]}`;
};