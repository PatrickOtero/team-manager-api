import { DevelopmentPlan } from "@prisma/client";

export const DEVELOPMENT_PLANS_REPOSITORY = Symbol('DEVELOPMENT_PLANS_REPOSITORY');

export interface DevelopmentPlansRepositoryInterface {
  create(data: { userId: string; createdById: string; content: string }): Promise<DevelopmentPlan>;
  update(id: string, data: { content: string | undefined }): Promise<DevelopmentPlan>;
  findByUserId(userId: string): Promise<DevelopmentPlan | null>;
  findById(id: string): Promise<DevelopmentPlan | null>;
}

