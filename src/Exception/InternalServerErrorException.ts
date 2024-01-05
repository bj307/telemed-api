import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(mensagem?: string) {
    super(mensagem || 'Ocorreu um erro interno no servidor', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}