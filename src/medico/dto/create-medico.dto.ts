import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, Min, MinLength } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import { Role } from "src/roles/enum/role.enum";

export class CreateMedicoDto {

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsEmail()
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
  @IsNotEmpty()
  crm: string;

  @ApiProperty()
  @IsNotEmpty()
  especialidade: string;

  @ApiProperty()
  @IsNotEmpty()
  //@IsCPF()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  rg: string;

  @ApiProperty()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  telefone: string;

  role?: Role;
}
