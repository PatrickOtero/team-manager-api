import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Attendance } from 'generated/prisma';
import { AttendancesRepositoryInterface } from '../attendances.interface';
import { AttendanceSummaryDto } from '../../dtos/attendance-summary.dto';

@Injectable()
export class AttendancesRepository implements AttendancesRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    trainingId: string;
    userId: string;
    status: 'PRESENT';
  }): Promise<Attendance> {
    return this.prisma.attendance.create({ data });
  }

  async findAllByUserId(userId: string) {
  return this.prisma.attendance.findMany({
    where: { userId },
    include: {
      training: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
}

async findAll() {
  return this.prisma.attendance.findMany({
    include: {
      user: true,
      training: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
}
async findByTrainingId(trainingId: string) {
  return this.prisma.attendance.findMany({
    where: { trainingId },
    include: {
      user: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
}
async findByUserAndTraining(data: {
  userId: string;
  trainingId: string;
}) {
  return this.prisma.attendance.findUnique({
    where: {
      userId_trainingId: {
        userId: data.userId,
        trainingId: data.trainingId,
      },
    },
  });
}
async getSummaryByUserId(userId: string): Promise<AttendanceSummaryDto> {
  const user = await this.prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { id: true, name: true },
  });

  const [present, absent, justifiedAbsence] = await Promise.all([
    this.prisma.attendance.count({ where: { userId, status: 'PRESENT' } }),
    this.prisma.attendance.count({ where: { userId, status: 'ABSENT' } }),
    this.prisma.attendance.count({ where: { userId, status: 'JUSTIFIED_ABSENCE' } }),
  ]);

  return {
    userId: user.id,
    userName: user.name,
    present,
    absent,
    justifiedAbsence,
  };
}

async getSummaryAll(): Promise<AttendanceSummaryDto[]> {
  const users = await this.prisma.user.findMany({
    where: { role: 'PLAYER' },
    select: { id: true },
  });

  return Promise.all(users.map((u) => this.getSummaryByUserId(u.id)));
}

}
