import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './repository/chat-repository';

@Module({
    providers: [ChatService, ChatRepository, ChatGateway],
    exports: [ChatService]
})
export class ChatModule {}
