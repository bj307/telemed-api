import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "../enum/status-consulta.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Prioridade } from "../enum/prioridade-consilta.enum";

export class CreateConsultaDto {

    @ApiProperty()
    @IsNotEmpty()
    nome?: string;

    @ApiProperty()
    descricao?: string;

    @ApiProperty()
    @IsNotEmpty()
    medico: string;

    @ApiProperty()
    @IsNotEmpty()
    paciente: string;

    @ApiProperty()
    medicacao?: string;

    @ApiProperty()
    @IsNotEmpty()
    dataDaConsulta: Date;

    @ApiProperty()
    @IsNotEmpty()
    horarioConsulta: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @ApiProperty()
    @IsNotEmpty()
    duracaoConsulta: string;

    @ApiProperty()
    @IsNotEmpty()
    feedback?: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    dataCriacao ?: Date = new Date();


    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Prioridade)
    prioridade: Prioridade;

    sala?: string;
}
