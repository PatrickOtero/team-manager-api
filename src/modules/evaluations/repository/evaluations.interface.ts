import { Evaluation } from 'generated/prisma';

export const EVALUATIONS_REPOSITORY = Symbol('EVALUATIONS_REPOSITORY');

export interface EvaluationsRepositoryInterface {
  create(data: {
    userId: string;
    evaluatorId: string;
    feedback: string;
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
  }): Promise<Evaluation>;
  findAllByUserId(userId: string)
}
