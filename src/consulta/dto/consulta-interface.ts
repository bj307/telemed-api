import { Status } from "../enum/status-consulta.enum";

export class ConsultaI {

    nome?: string;
    descricao?: string;
    medico?: string;
    paciente?: string;
    medicacao?: string;
    dataDaConsulta?: Date;
    horarioConsulta?: string;
    status?: Status;
    duracaoConsulta?: string;
    feedback?: string;
    dataCriacao ?: Date = new Date();
    sala?: string;
}