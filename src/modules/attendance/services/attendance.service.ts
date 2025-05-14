import { Inject, Injectable } from '@nestjs/common';
import { ATTENDANCES_REPOSITORY, AttendancesRepositoryInterface } from '../repositories/attendances.interface';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { AttendanceAlreadyExistsException, ForbiddenRoleException } from 'src/common/exceptions';


@Injectable()
export class AttendancesService {
  constructor(
    @Inject(ATTENDANCES_REPOSITORY)
    private readonly attendancesRepo: AttendancesRepositoryInterface,
  ) {}

async create(dto: CreateAttendanceDto, userId: string) {
  const existing = await this.attendancesRepo.findByUserAndTraining({
    userId,
    trainingId: dto.trainingId,
  });

  if (existing) {
    throw new AttendanceAlreadyExistsException();
  }

  return this.attendancesRepo.create({
    trainingId: dto.trainingId,
    userId,
    status: 'PRESENT',
  });
}
  async findAll(user: { id: string; role: 'ADMIN' | 'PLAYER' }) {
  if (user.role === 'ADMIN') {
    return this.attendancesRepo.findAll();
  }

  return this.attendancesRepo.findAllByUserId(user.id);
}
async findByTrainingId(trainingId: string, requester: { role: 'ADMIN' }) {
  if (requester.role !== 'ADMIN') {
    throw new ForbiddenRoleException(requester.role)
  }

  return this.attendancesRepo.findByTrainingId(trainingId);
}

}
