/* eslint-disable prettier/prettier */
import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Chat } from './dto/chat.dto';
import { OnModuleInit } from '@nestjs/common';
import { Sala } from './dto/sala.interface';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  onModuleInit() {
    console.log('ChatGateway iniciado');
  }
  afterInit(server: Server) {
    console.log('ChatGateway inicializado');
  }

  //passa primeiro aqui quando disparo o send
  async handleConnection(socket: Socket) {
    try {
      let usuario = socket.handshake.headers.usuarios;
      if (!socket.handshake.headers.usuarios) {
        this.disconectar(socket);
      } else {
        const salas = await this.chatService.getSalas();
        return this.server.to(socket.id).emit('salas', salas);
      }
    } catch (error) {
      return this.disconectar(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    this.disconectar(socket);
  }

  @SubscribeMessage('chat')
  async handleNewMessage(
    @MessageBody() chat: Chat,
    @ConnectedSocket() sender: Socket,
  ) {
    console.log('novo chat', chat);
    sender.emit('novo chat', chat);
  }

  @SubscribeMessage('criarSala')
  async onCriarSala(socket: Socket, sala: Sala) {
    let usuarios = socket.handshake.headers.usuarios;
    if (typeof usuarios === 'string') {
      usuarios = usuarios.split(',');
    }
    let usuariosString = usuarios.join(',');
    console.log(sala.id, usuariosString);
    console.log(socket);
    this.chatService.criarSala(sala.id.toString(), usuariosString);
  }

  private disconectar(socket: Socket) {
    socket.disconnect();
  }
}
