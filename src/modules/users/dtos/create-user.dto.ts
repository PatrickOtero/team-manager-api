import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['ADMIN', 'PLAYER'])
  role: 'ADMIN' | 'PLAYER';
}
