import { IsString } from 'class-validator';

export class CreateDevelopmentPlanDto {
  @IsString()
  content: string;
}
