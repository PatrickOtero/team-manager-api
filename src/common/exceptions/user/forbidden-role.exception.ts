import { DomainException } from '../domain.exception';
import { HttpStatus } from '@nestjs/common';
export class ForbiddenRoleException extends DomainException {
  constructor(role: string) {
    super(
      `Usuários com papel '${role}' não têm permissão para essa ação.`,
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
