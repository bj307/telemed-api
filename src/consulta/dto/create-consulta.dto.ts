import { IsDate, IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "../enum/status-consulta.enum";
import { ApiProperty } from "@nestjs/swagger";

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
}
