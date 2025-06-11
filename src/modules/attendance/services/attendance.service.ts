import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ATTENDANCES_REPOSITORY, AttendancesRepositoryInterface } from '../repositories/attendances.interface';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { AttendanceAlreadyExistsException, ForbiddenRoleException } from 'src/common/exceptions';
import { TRAININGS_REPOSITORY, TrainingsRepositoryInterface } from 'src/modules/trainings/repositories/trainings.interface';
import { RegisterAttendanceByAdminDto } from '../dtos/register-attendance-by-admin.dto';


@Injectable()
export class AttendancesService {
  constructor(
    @Inject(ATTENDANCES_REPOSITORY)
    private readonly attendancesRepo: AttendancesRepositoryInterface,
    @Inject(TRAININGS_REPOSITORY)
    private readonly trainingsRepo: TrainingsRepositoryInterface
  ) {}

async registerByAdmin(dto: RegisterAttendanceByAdminDto) {
  const existing = await this.attendancesRepo.findByUserAndTraining({
    userId: dto.userId,
    trainingId: dto.trainingId,
  });

  if (existing) {
    throw new AttendanceAlreadyExistsException();
  }

  return this.attendancesRepo.create({
    trainingId: dto.trainingId,
    userId: dto.userId,
    status: dto.status,
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

async getSummary(user: { id: string; role: 'ADMIN' | 'PLAYER' }) {
  if (user.role === 'ADMIN') {
    return this.attendancesRepo.getSummaryAll();
  }

  return this.attendancesRepo.getSummaryByUserId(user.id);
}

async registerAbsence(userId: string, dto: CreateAttendanceDto) {
  const existing = await this.attendancesRepo.findByUserAndTraining({
    userId,
    trainingId: dto.trainingId,
  });

  if (existing) {
    throw new AttendanceAlreadyExistsException();
  }

  const status = dto.justified ? 'JUSTIFIED_ABSENCE' : 'ABSENT';

  return this.attendancesRepo.create({
    trainingId: dto.trainingId,
    userId,
    status,
  });
}
}
