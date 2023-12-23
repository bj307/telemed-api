import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Min,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateMedicoDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  })
  senha: string;

  @IsNotEmpty()
  crm: string;

  @IsNotEmpty()
  especialidade: string;

  @IsNotEmpty()
  //@IsCPF()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  endereco: string;

  @IsPhoneNumber('BR')
  telefone: string;
}
