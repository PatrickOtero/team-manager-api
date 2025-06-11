import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Training } from 'generated/prisma';
import { TrainingsRepositoryInterface } from '../trainings.interface';

@Injectable()
export class TrainingsRepository implements TrainingsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    date: Date;
    location: string;
    description?: string;
    createdById: string;
  }): Promise<Training> {
    return this.prisma.training.create({ data });
  }

  async findAll(): Promise<Training[]> {
  return this.prisma.training.findMany({
    orderBy: {
      date: 'desc',
    },
  });
}
async findByMonth(month: number, year: number) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  return this.prisma.training.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { date: 'asc' },
  });
}
async findFutureTrainings() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return this.prisma.training.findMany({
    where: {
      date: { gte: today },
    },
    orderBy: { date: 'asc' },
  });
}
async findById(id: string): Promise<Training | null> {
  return this.prisma.training.findUnique({
    where: { id },
  });
}

}
