import { Attendance } from 'generated/prisma';
import { AttendanceSummaryDto } from '../dtos/attendance-summary.dto';

export const ATTENDANCES_REPOSITORY = Symbol('ATTENDANCES_REPOSITORY');

export interface AttendancesRepositoryInterface {
create(data: {
  trainingId: string;
  userId: string;
  status: 'PRESENT' | 'ABSENT' | 'JUSTIFIED_ABSENCE';
}): Promise<Attendance>;
  findAllByUserId(userId: string)
  findAll()
  findByTrainingId(trainingId: string)
  findByUserAndTraining(data: {
  userId: string;
  trainingId: string;
})
getSummaryByUserId(userId: string): Promise<AttendanceSummaryDto>;
getSummaryAll(): Promise<AttendanceSummaryDto[]>;
}
