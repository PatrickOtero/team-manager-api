import { DomainException } from '../domain.exception';
import { HttpStatus } from '@nestjs/common';
export class TrainingNotFoundException extends DomainException {
  constructor() {
    super(
      'Treino não encontrado.',
      HttpStatus.NOT_FOUND,
      'Not Found',
    );
  }
}
