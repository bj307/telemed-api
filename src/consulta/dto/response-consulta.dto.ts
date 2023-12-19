import { ResponseMedicacaoDto } from "src/medicacao/dto/response.medicacao.dto";
import { MedicoResponseDto } from "src/medico/dto/response-medico.dto";
import { ShowPacienteDto } from "src/paciente/dto/show-paciente.dto";
import { Status } from "../enum/status-consulta.enum";

export class ResponseConsulta {
    id?: string;
    nome?: string;
    descricao?: string;
    medico: MedicoResponseDto;
    paciente: ShowPacienteDto;
    medicacao: ResponseMedicacaoDto;
    data?: Date;
    horario?: string;
    status?: Status;
    duracao?: string;
    feedback?: string;
}