import { Controller, Post, Body } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDTO } from './dto/login.dto';

@Controller('session')
export class SessionController {
  
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  public async login(@Body() login: LoginDTO) {
    try {
      if (login.cpf) {
        return await this.sessionService.loginPaciente(login);
      } else if (login.crm) {
        return await this.sessionService.loginMedico(login);
      } else if (!login.cpf && !login.crm) {
        return await this.sessionService.loginAdm(login);
      } else {
        throw new Error('Credenciais inválidas.');
      }
    } catch (error) {
      return error.message;
    }
  }
}
