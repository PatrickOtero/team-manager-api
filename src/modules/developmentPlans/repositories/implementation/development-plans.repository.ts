import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { DevelopmentPlan } from '@prisma/client';
import { DevelopmentPlansRepositoryInterface } from '../../interface/development-plans.interface';


@Injectable()
export class DevelopmentPlansRepository implements DevelopmentPlansRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { userId: string; createdById: string; content: string }): Promise<DevelopmentPlan> {
    return this.prisma.developmentPlan.create({ data });
  }

  update(id: string, data: { content: string }): Promise<DevelopmentPlan> {
    return this.prisma.developmentPlan.update({ where: { id }, data });
  }

  findByUserId(userId: string): Promise<DevelopmentPlan | null> {
    return this.prisma.developmentPlan.findFirst({ where: { userId } });
  }

  findById(id: string): Promise<DevelopmentPlan | null> {
    return this.prisma.developmentPlan.findUnique({ where: { id } });
  }
}