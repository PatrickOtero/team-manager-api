import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AttendancesController } from './controllers/attendance.controller';
import { AttendancesService } from './services/attendance.service';
import { ATTENDANCES_REPOSITORY } from './repositories/attendances.interface';
import { AttendancesRepository } from './repositories/implementation/attendances.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    {
      provide: ATTENDANCES_REPOSITORY,
      useClass: AttendancesRepository,
    },
  ],
})
export class AttendancesModule {}
