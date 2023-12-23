import { Injectable } from "@nestjs/common";
import { Chat } from "./dto/chat.dto";
import { ChatRepository } from './repository/chat-repository';

@Injectable()
export class ChatService {
    constructor(private readonly repository: ChatRepository){}

    salvarChat(chat: Chat) {
        this.repository.addChat(chat);
    }

    async getChats(): Promise<Chat[]> {
        return await this.repository.getChats();
    }
}
