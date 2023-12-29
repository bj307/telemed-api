import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './repository/chat-repository';

import { salaControler } from './chatControlerteste';

@Module({
  controllers: [salaControler],
  imports: [],
  providers: [ChatGateway, ChatService, ChatRepository],
})
export class ChatModule {}
