export interface IAttendance {
  id: string;
  userId: string;
  trainingId: string;
  status: 'PRESENT' | 'ABSENT' | 'JUSTIFIED_ABSENCE';
  timestamp: Date;
}
