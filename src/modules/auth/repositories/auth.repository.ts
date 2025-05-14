import { User } from "@prisma/client";

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface AuthRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
}
