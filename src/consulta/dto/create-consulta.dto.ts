import { IsDate, IsEnum, IsNotEmpty, isNotEmpty } from "class-validator";
import { Status } from "../enum/status-consulta.enum";

export class CreateConsultaDto {

    @IsNotEmpty()
    nome?: string;

    descricao?: string;

    @IsNotEmpty()
    medico: string;

    @IsNotEmpty()
    paciente: string;

    medicacao?: string;

    @IsNotEmpty()
    dataDaConsulta: Date;

    @IsNotEmpty()
    horarioConsulta: string;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @IsNotEmpty()
    duracaoConsulta: string;

    @IsNotEmpty()
    feedback?: string;

    @IsDate()
    @IsNotEmpty()
    dataCriacao ?: Date = new Date();
}
