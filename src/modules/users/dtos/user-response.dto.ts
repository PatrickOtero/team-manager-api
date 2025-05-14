import { User } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PLAYER';

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}
