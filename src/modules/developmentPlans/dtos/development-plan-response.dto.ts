import { Expose } from 'class-transformer';

export class DevelopmentPlanResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  createdById: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
