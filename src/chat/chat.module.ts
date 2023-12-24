import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './repository/chat-repository';
import { SessionModule } from 'src/session/session.module';
import { salaControler } from './chatControlerteste';

@Module({
    controllers: [salaControler],
    imports: [SessionModule],
    providers: [ChatGateway, ChatService, ChatRepository],
})

export class ChatModule {}
