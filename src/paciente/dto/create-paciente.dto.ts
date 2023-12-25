import { Role } from '../../auth/enum/role.enum';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreatePacienteDto {
  
  @ApiProperty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  cpf: number;

  @ApiProperty()
  rg: number;

  @ApiProperty()3
  @IsPhoneNumber ('BR')
  telefone: number;

  role?: Role;
}
