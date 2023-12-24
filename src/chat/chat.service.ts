import { Injectable } from "@nestjs/common";
import { Chat } from "./dto/chat.dto";
import { ChatRepository } from './repository/chat-repository';
import { Sala } from "./dto/sala.interface";

@Injectable()
export class ChatService {

    constructor(private readonly chatRepository: ChatRepository) {}

    async criarSala(sala: Sala, usuarios: string[]) {
        return this.chatRepository.criarSala(sala, usuarios);
    }

    async getSalas() {
        return this.chatRepository.getSalas();
    }

    async addASalaaddASala(sala: Sala, usuarios: string[]) {
        return this.chatRepository.addASala(sala, usuarios);
    }

}
