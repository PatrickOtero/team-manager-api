import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

import { CreateDevelopmentPlanDto } from '../dtos/create-development-plan.dto';
import { UpdateDevelopmentPlanDto } from '../dtos/update-development-plan.dto';
import { DEVELOPMENT_PLANS_REPOSITORY, DevelopmentPlansRepositoryInterface } from '../interface/development-plans.interface';

@Injectable()
export class DevelopmentPlansService {
  constructor(
    @Inject(DEVELOPMENT_PLANS_REPOSITORY)
    private readonly devPlanRepo: DevelopmentPlansRepositoryInterface,
  ) {}

  create(userId: string, createdById: string, dto: CreateDevelopmentPlanDto) {
    return this.devPlanRepo.create({ userId, createdById, content: dto.content });
  }

  async update(id: string, dto: UpdateDevelopmentPlanDto, requester: { id: string; role: string }) {
    const plan = await this.devPlanRepo.findById(id);
    if (!plan) throw new NotFoundException('Plano não encontrado');
    if (requester.role !== 'ADMIN') throw new ForbiddenException();

    return this.devPlanRepo.update(id, { content: dto.content });
  }

  async findByUserId(userId: string, requester: { id: string; role: string }) {
    if (requester.role !== 'ADMIN' && requester.id !== userId) {
      throw new ForbiddenException();
    }

    const plan = await this.devPlanRepo.findByUserId(userId);
    if (!plan) throw new NotFoundException('Plano não encontrado');
    return plan;
  }
}