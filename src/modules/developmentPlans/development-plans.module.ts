import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { DevelopmentPlansController } from './controllers/development-plan.controller';
import { DevelopmentPlansService } from './services/development-plans.service';

import { DevelopmentPlansRepository } from './repositories/implementation/development-plans.repository';
import { DEVELOPMENT_PLANS_REPOSITORY } from './interface/development-plans.interface';

@Module({
  imports: [PrismaModule],
  controllers: [DevelopmentPlansController],
  providers: [
    DevelopmentPlansService,
    {
      provide: DEVELOPMENT_PLANS_REPOSITORY,
      useClass: DevelopmentPlansRepository,
    },
  ],
})
export class DevelopmentPlansModule {}