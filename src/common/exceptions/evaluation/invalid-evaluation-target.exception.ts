import { DomainException } from '../domain.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidEvaluationTargetException extends DomainException {
  constructor() {
    super(
      'Não é permitido avaliar este usuário.',
      HttpStatus.BAD_REQUEST,
      'Invalid Target',
    );
  }
}
