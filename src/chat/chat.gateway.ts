import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Chat } from './dto/chat.dto';
import { OnModuleInit } from '@nestjs/common';
import { Sala } from './dto/sala.interface';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {

    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) { }

    onModuleInit() {
        console.log('ChatGateway iniciado');
    }

    afterInit(server: Server) {
        console.log('ChatGateway inicializado');
    }

    handleConnection(client: Socket) {
        console.log('Cliente conectado');
    }

    handleDisconnect(client: Socket) {
        console.log('Cliente desconectado', client.handshake.query.id);
        client.disconnect();
    }

    @SubscribeMessage('chat')
    async handleNewMessage(@MessageBody() chat: Chat,
        @ConnectedSocket() sender: Socket) {
        console.log('novo chat', chat);
        sender.emit('novo chat', chat);
    }

    @SubscribeMessage('criarSala')
    async onCriarSala(socket: Socket, sala: Sala) {
        console.log('criar sala', socket);
        let usuarios = socket.handshake.headers.usuarios;
        console.log('usuarios', usuarios);
        if (typeof usuarios === 'string') {
            usuarios = usuarios.split(',');
        }
        this.chatService.criarSala(sala, usuarios);
    }
}