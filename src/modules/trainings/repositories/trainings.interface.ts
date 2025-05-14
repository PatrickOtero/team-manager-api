import { Training } from 'generated/prisma';

export const TRAININGS_REPOSITORY = Symbol('TRAININGS_REPOSITORY');

export interface TrainingsRepositoryInterface {
  create(data: {
    date: Date;
    location: string;
    description?: string;
    createdById: string;
  }): Promise<Training>;
  findAll(): Promise<Training[]>
}
