import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateAdmDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: number;

  @ApiProperty()
  @IsPhoneNumber('BR')
  telefone: number;
}
