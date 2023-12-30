import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../service/chat.service';


@Controller('sala')
export class salaControler {

  constructor(private readonly chatService: ChatService) {}


  @Get()
  public async getHello() {
    console.log('get salas');
    return await this.chatService.getSalas();
  }

}
