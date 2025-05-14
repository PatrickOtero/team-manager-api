import { Module } from '@nestjs/common';
import { EvaluationsController } from './evaluations.controller';
import { EvaluationsService } from './evaluations.service';
import { PrismaModule } from 'prisma/prisma.module';
import { EVALUATIONS_REPOSITORY } from './repository/evaluations.interface';
import { EvaluationsRepository } from './repository/implementation/evaluations.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EvaluationsController],
  providers: [
    EvaluationsService,
    {
      provide: EVALUATIONS_REPOSITORY,
      useClass: EvaluationsRepository,
    },
  ],
})
export class EvaluationsModule {}
