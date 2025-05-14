import { DomainException } from '../domain.exception';
import { HttpStatus } from '@nestjs/common';
export class AttendanceAlreadyExistsException extends DomainException {
  constructor() {
    super(
      'Presença já registrada para este treino.',
      HttpStatus.CONFLICT,
      'Conflict',
    );
  }
}
