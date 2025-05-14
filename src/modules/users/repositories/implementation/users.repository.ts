import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepositoryInterface } from '../users.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'PLAYER';
  }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
