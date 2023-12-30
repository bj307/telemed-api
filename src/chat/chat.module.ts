import { Module, forwardRef } from '@nestjs/common';
import { ChatRepository } from './repository/chat-repository';
import { ChatGateway } from './gateway/chat.gateway';
import { salaControler } from './controler/chatControlerteste';
import { ChatService } from './service/chat.service';
import { ConsultaModule } from 'src/consulta/consulta.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [salaControler],
    imports: [
        forwardRef(() => ConsultaModule),
        AuthModule
    ],
    providers: [ChatGateway, ChatService, ChatRepository],
})

export class ChatModule {}
