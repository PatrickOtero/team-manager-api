import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { AttendancesService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}
  @Roles("PLAYER")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAttendanceDto,
    @CurrentUser() user: any,
  ) {
    return this.attendancesService.create(dto, user.id);
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
}
