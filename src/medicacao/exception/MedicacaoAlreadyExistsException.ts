import { HttpException, HttpStatus } from '@nestjs/common';

export class MedicacaoAlreadyExistsException extends HttpException {
  constructor(id: string) {
    super(`Medicação com ID ${id} já existe`, HttpStatus.CONFLICT);
  }
}