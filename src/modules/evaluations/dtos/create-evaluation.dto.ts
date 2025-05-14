import { IsInt, Min, Max, IsString } from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  feedback: string;

  @IsInt()
  @Min(0)
  @Max(10)
  technical: number;

  @IsInt()
  @Min(0)
  @Max(10)
  tactical: number;

  @IsInt()
  @Min(0)
  @Max(10)
  physical: number;

  @IsInt()
  @Min(0)
  @Max(10)
  mental: number;
}
