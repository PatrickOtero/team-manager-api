import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { TrainingsController } from './controllers/trainings.controller';
import { TrainingsService } from './services/trainings.service';
import { TRAININGS_REPOSITORY } from './repositories/trainings.interface';
import { TrainingsRepository } from './repositories/implementation/trainings.repository';


@Module({
  imports: [PrismaModule],
  controllers: [TrainingsController],
  providers: [
    TrainingsService,
    {
      provide: TRAININGS_REPOSITORY,
      useClass: TrainingsRepository,
    },
  ],
})
export class TrainingsModule {}
