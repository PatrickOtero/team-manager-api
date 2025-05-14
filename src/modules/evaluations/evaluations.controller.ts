import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dtos/create-evaluation.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Controller('users/:userId/evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}
  @Roles('ADMIN')
@UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateEvaluationDto,
    @CurrentUser() user: any,
  ) {
    return this.evaluationsService.create(dto, userId, user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Param('userId') userId: string, @CurrentUser() user: any) {
    return this.evaluationsService.findAllByUserId(userId, user);
  }
}
