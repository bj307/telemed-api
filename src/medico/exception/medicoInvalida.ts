import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidMedicoDataException extends HttpException {
    constructor() {
      super('Os dados fornecidos para a medico são inválidos', HttpStatus.BAD_REQUEST);
    }
  }