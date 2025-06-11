import { IsEnum, IsString } from 'class-validator';
import { AttendanceStatus } from '@prisma/client';

export class RegisterAttendanceByAdminDto {
  @IsString()
  trainingId: string;

  @IsString()
  userId: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
