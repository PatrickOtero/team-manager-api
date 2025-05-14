import { HttpException } from '@nestjs/common';
export class DomainException extends HttpException {
  constructor(message: string, statusCode: number, errorType?: string) {
    super(
      {
        statusCode,
        message,
        error: errorType ?? 'DomainException',
      },
      statusCode,
    );
  }
}
