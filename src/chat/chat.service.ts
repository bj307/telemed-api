import { Injectable } from "@nestjs/common";
import { Chat } from "./dto/chat.dto";
import { ChatRepository } from './repository/chat-repository';
import { Sala } from "./dto/sala.interface";

@Injectable()
export class ChatService {

    constructor(private readonly chatRepository: ChatRepository) {}

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
