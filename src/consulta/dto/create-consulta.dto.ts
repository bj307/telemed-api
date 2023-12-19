import { IsDate, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateConsultaDto {

    @IsNotEmpty()
    nome?: string;

    descricao?: string;

    @IsNotEmpty()
    medico: string;

    @IsNotEmpty()
    paciente: string;

    medicacao?: string | "sem medicação";

    @IsNotEmpty()
    dataDaConsulta: Date;

    @IsNotEmpty()
    horarioConsulta: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    duracaoConsulta: string;

    @IsNotEmpty()
    feedback?: string;

    @IsDate()
    @IsNotEmpty()
    dataCriacao ?: Date = new Date();
}
