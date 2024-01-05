import { HttpException, HttpStatus } from '@nestjs/common';

export class MedicoNotFoundException extends HttpException {
  
  constructor(id: string) {
    super(`Médico com ID ${id} não encontrado`, HttpStatus.NOT_FOUND);
  }
  
}