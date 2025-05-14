import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Attendance } from 'generated/prisma';
import { AttendancesRepositoryInterface } from '../attendances.interface';

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

}
