import { Attendance } from 'generated/prisma';

export const ATTENDANCES_REPOSITORY = Symbol('ATTENDANCES_REPOSITORY');

export interface AttendancesRepositoryInterface {
  create(data: {
    trainingId: string;
    userId: string;
    status: 'PRESENT';
  }): Promise<Attendance>;
  findAllByUserId(userId: string)
  findAll()
  findByTrainingId(trainingId: string)
  findByUserAndTraining(data: {
  userId: string;
  trainingId: string;
})
}
