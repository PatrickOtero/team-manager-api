import { Expose } from 'class-transformer';

export class AttendanceSummaryDto {
  @Expose()
  userId: string;

  @Expose()
  userName: string;

  @Expose()
  present: number;

  @Expose()
  absent: number;

  @Expose()
  justifiedAbsence: number;
}
