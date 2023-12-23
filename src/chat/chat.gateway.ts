import { Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server } from "http";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Chat } from './dto/chat.dto';

@WebSocketGateway()
export class ChatGateway implements NestGateway {
    server: Server;
    constructor(private chatService: ChatService) { }

    afterInit(server: Server) {
        console.log('ChatGateway inicializado');
        this.server = server;
    }

    handleConnection(client: Socket) {
        console.log('Cliente conectado');
        process.nextTick(async () => {
            client.emit('message', await this.chatService.getChats());
        })
    }

    handleDisconnect(client: Socket) {
        console.log('Cliente desconectado');
    }

    @SubscribeMessage('chat')
    async handleNewMessage(@MessageBody() chat: Chat, @ConnectedSocket() sender: Socket) {
        console.log('novo chat', chat);
        this.chatService.salvarChat(chat);
        sender.emit('novo chat', chat);
        this.server.emit('novo chat', chat);
    }
}