import { Controller, Post, Body } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDTO } from './dto/login.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  public async login(@Body() login: LoginDTO) {
    return login;
  }
}
