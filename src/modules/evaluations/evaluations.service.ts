import { Inject, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';
import { EVALUATIONS_REPOSITORY, EvaluationsRepositoryInterface } from './repository/evaluations.interface';
import { UnauthorizedEvaluationAccessException } from 'src/common/exceptions';


@Injectable()
export class EvaluationsService {
  constructor(
    @Inject(EVALUATIONS_REPOSITORY)
    private readonly evaluationsRepo: EvaluationsRepositoryInterface,
  ) {}

async create(dto: CreateEvaluationDto, userId: string, evaluatorId: string) {
  return this.evaluationsRepo.create({
    ...dto,
    userId,
    evaluatorId,
  });
}

async findAllByUserId(userId: string, requester: { id: string; role: string }) {
  if (requester.role !== 'ADMIN' && requester.id !== userId) {
    throw new UnauthorizedEvaluationAccessException();
  }

  return this.evaluationsRepo.findAllByUserId(userId);
}

}
