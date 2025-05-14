import { DomainException } from '../domain.exception';
import { HttpStatus } from '@nestjs/common';
export class UnauthorizedEvaluationAccessException extends DomainException {
  constructor() {
    super(
      'Você não tem permissão para visualizar as avaliações deste jogador.',
      HttpStatus.FORBIDDEN,
      'Forbidden',
    );
  }
}
