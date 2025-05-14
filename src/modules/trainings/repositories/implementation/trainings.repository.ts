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
}
