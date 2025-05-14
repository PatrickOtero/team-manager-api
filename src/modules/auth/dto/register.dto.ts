import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'generated/prisma';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
