import { Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../auth.repository';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  
}