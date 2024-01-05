import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailEmUsoException extends HttpException {
  constructor() {
    super('Email já está em uso', HttpStatus.CONFLICT);
  }
}

export class CpfEmUsoException extends HttpException {
  constructor() {
    super('CPF já está em uso', HttpStatus.CONFLICT);
  }
}

export class CrmEmUsoException extends HttpException {
  constructor() {
    super('CRM já está em uso', HttpStatus.CONFLICT);
  }
}