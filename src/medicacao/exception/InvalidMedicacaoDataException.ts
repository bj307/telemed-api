import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidMedicacaoDataException extends HttpException {
  constructor() {
    super('Os dados fornecidos para a medicação são inválidos', HttpStatus.BAD_REQUEST);
  }
}