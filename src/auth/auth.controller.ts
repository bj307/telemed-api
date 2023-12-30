import { Controller, Get, Post, Body, Request, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorator/is-public.decorator';
import { LoginDTO } from 'src/session/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  public async signIn(@Body() login: LoginDTO) {
    try {
      if (login.cpf) {
        return await this.authService.loginPaciente(login);
      } else if (login.crm) {
        return await this.authService.loginMedico(login);
      } else if (!login.cpf && !login.crm) {
        return await this.authService.loginAdm(login);
      } else {
        throw new Error('Credenciais inválidas.');
      }
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

