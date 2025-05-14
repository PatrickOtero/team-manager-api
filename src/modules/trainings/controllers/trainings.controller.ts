import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { TrainingsService } from '../services/trainings.service';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTrainingDto,
    @CurrentUser() user: any,
  ) {
    return this.trainingsService.create(dto, user.id);
  }
    @UseGuards(AuthGuard('jwt'))
    @Get()
  async findAll(@CurrentUser() user: any) {
    return this.trainingsService.findAll();
  }
}
