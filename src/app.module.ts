import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { AttendancesModule } from './modules/attendance/attendance.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { DevelopmentPlansModule } from './modules/developmentPlans/development-plans.module';

@Module({
  imports: [AuthModule, UsersModule, TrainingsModule, AttendancesModule, EvaluationsModule, DevelopmentPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
