/* eslint-disable prettier/prettier */
import { Server, Socket } from 'socket.io';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from '../service/chat.service';
import { ConsultaI } from 'src/consulta/dto/consulta-interface';

@WebSocketGateway({ cors: true, namespace: '/chat' })
export class ChatGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) { }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', client.id);
  }


  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');


  async onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        const token = await this.authService.verifyJwt(socket.handshake.headers.authorization);
        if (token == null) {
          this.handleDisconnect(socket);
        }
        const consulta: ConsultaI = await this.chatService.verificarSeTemConsulta(token);
        const salaId = consulta[0].sala;
        this.handleJoinRoom(salaId, socket);
      } catch (error) {
        this.handleDisconnect(socket);
      }
    });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(@MessageBody() mensagem: any) {
    this.server.to(mensagem.sala).emit('receiveMessage', mensagem);
  }


  @SubscribeMessage('joinRoom')
  handleJoinRoom(sala: string, client: Socket) {
    client.join(sala);
    this.server.emit('joinedRoom', sala);
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
    console.log('disconnected', client.id);
  }

  @SubscribeMessage('callUser')
  handleCallUser(@MessageBody() data: any) {
    this.server.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
  }

  @SubscribeMessage('acceptCall')
  handleAcceptCall(@MessageBody() data: any) {
    this.server.to(data.to).emit('callAccepted', data.signal);
  }

}
