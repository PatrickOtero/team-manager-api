import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepositoryInterface } from './repositories/users.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepo: UsersRepositoryInterface,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.usersRepo.create({
      ...data,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async findById(id: string) {
    return this.usersRepo.findById(id);
  }
}
