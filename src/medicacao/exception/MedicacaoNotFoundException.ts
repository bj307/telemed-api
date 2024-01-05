import { HttpException, HttpStatus } from '@nestjs/common';

export class MedicacaoNotFoundException extends HttpException {
  
    constructor(id: string) {
    super(`Medicação com ID ${id} não encontrada`, HttpStatus.NOT_FOUND);
  }
  
}