import { Injectable } from "@nestjs/common";
import { ChatRepository } from '../repository/chat-repository';
import { Sala } from "../dto/sala.interface";
import { ConsultaService } from "src/consulta/consulta.service";
import { AuthService } from "src/auth/auth.service";
import { Payload } from "src/auth/model/payload";

@Injectable()
export class ChatService {


    constructor(
        private chatRepository: ChatRepository,
        private consulta: ConsultaService,
    ) { }

    async verificarSeTemConsulta(token: Payload): Promise<any> {
        try {
            if (token.userType == 'paciente') {
                const consulta = await this.consulta.buscarConsultasPorPacienteID(token.id);
                return consulta;
            } else if (token.userType == 'medico') {
                const consulta = await this.consulta.buscarConsultasPorMedicoID(token.id);
                return consulta;
            }else {
                return "Não tem consulta";
            }
        } catch (error) {
            return "Não tem consulta";
        }   

    }

    async criarSala(sala: string, usuarios: string) {
        return await this.chatRepository.adicionarUsuario(sala, usuarios);
    }

    async getSalas() {
        return await this.chatRepository.getSalas();
    }

    async addASalaaddASala(sala: Sala, usuarios: string[]) {
        return await this.chatRepository.addASala(sala, usuarios);
    }

}
