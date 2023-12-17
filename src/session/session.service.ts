import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AdmService } from 'src/adm/adm.service';
import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly admService: AdmService,
    private readonly pacienteService: PacienteService,
  ) {}

  async loginAdm(login: LoginDTO) {
    try {
      const valid = await this.admService.checkPassword(
        login.senha,
        login.email,
      );

      if (!valid) {
        throw new NotFoundException('Credenciais inválidas.');
      }

      const adm = await this.admService.findByEmail(login.email);

      return adm;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }

  async loginMedico(login: LoginDTO) {
    return login;
  }

  async loginPaciente(login: LoginDTO) {
    try {
      const valid = await this.pacienteService.checkPassword(
        login.senha,
        login.email,
      );

      if (!valid) {
        throw new NotFoundException('Credenciais inválidas.');
      }

      const adm = await this.pacienteService.findByEmail(login.email);

      return adm;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }
}
