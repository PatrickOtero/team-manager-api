import { User } from '@prisma/client';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepositoryInterface {
  create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'PLAYER';
  }): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;
}
