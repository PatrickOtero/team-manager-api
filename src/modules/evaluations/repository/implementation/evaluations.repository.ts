import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Evaluation } from 'generated/prisma';
import { EvaluationsRepositoryInterface } from '../evaluations.interface';

@Injectable()
export class EvaluationsRepository implements EvaluationsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId: string;
    evaluatorId: string;
    feedback: string;
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
  }): Promise<Evaluation> {
    return this.prisma.evaluation.create({ data });
  }

  async findAllByUserId(userId: string) {
  return this.prisma.evaluation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      evaluator: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}
}
