import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DevelopmentPlansService } from '../services/development-plans.service';
import { CreateDevelopmentPlanDto } from '../dtos/create-development-plan.dto';
import { UpdateDevelopmentPlanDto } from '../dtos/update-development-plan.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';

@Controller('developmentPlan')
export class DevelopmentPlansController {
  constructor(private readonly devPlanService: DevelopmentPlansService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(":userId")
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateDevelopmentPlanDto,
    @CurrentUser() user: any,
  ) {
    return this.devPlanService.create(userId, user.id, dto);
  }

@UseGuards(AuthGuard('jwt'))
@Get()
getPlan(@CurrentUser() user: any) {
  return this.devPlanService.findByUserId(user.id, user);
}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDevelopmentPlanDto,
    @CurrentUser() user: any,
  ) {
    return this.devPlanService.update(id, dto, user);
  }
}