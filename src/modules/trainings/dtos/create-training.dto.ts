import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTrainingDto {
  @IsDateString()
  date: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;
}
