import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { AttendancesService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RegisterAttendanceByAdminDto } from '../dtos/register-attendance-by-admin.dto';
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}
    @Roles("ADMIN")
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('admin')
    @HttpCode(HttpStatus.CREATED)
    async registerByAdmin(
      @Body() dto: RegisterAttendanceByAdminDto,
    ) {
      return this.attendancesService.registerByAdmin(dto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
  async findAll(@CurrentUser() user: any) {
    return this.attendancesService.findAll(user);
  }
    @UseGuards(AuthGuard('jwt'))
    @Get('/training/:id')
  async findByTraining(
    @Param('id') trainingId: string,
    @CurrentUser() user: any,
  ) {
    return this.attendancesService.findByTrainingId(trainingId, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('summary')
  async getSummary(@CurrentUser() user: any) {
  return this.attendancesService.getSummary(user);
}

@Roles('ADMIN')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Post('absence/:userId')
@HttpCode(HttpStatus.CREATED)
registerAbsence(
  @Param('userId') userId: string,
  @Body() dto: CreateAttendanceDto,
) {
  return this.attendancesService.registerAbsence(userId, dto);
}

}
