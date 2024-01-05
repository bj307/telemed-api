import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Min, MinLength } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class CreateMedicoDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({
    message: 'Informe um email',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  })
  senha: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o CRM',
  })
  @IsString()
  crm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  especialidade: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o CPF',
  })
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o RG',
  })
  @IsString()
  rg: string;

  @ApiProperty()
  @IsString()
  endereco: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  telefone: string;

  //role?: Role;
}
