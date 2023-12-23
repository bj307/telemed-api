import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AdmService } from 'src/adm/adm.service';
import { PacienteService } from 'src/paciente/paciente.service';
import { MedicoService } from 'src/medico/medico.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly admService: AdmService,
    private readonly pacienteService: PacienteService,
    private readonly medicoService: MedicoService,
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
    try {
      const crmValid = await this.medicoService.checkCRM(
        login.crm,
        login.email,
      );

      if (!crmValid) {
        throw new NotFoundException('Email e CRM incompatíveis.');
      }

      const valid = await this.medicoService.checkPassword(
        login.senha,
        login.email,
      );

      if (!valid) {
        throw new NotFoundException('Credenciais inválidas.');
      }

      const medico = await this.medicoService.findByEmail(login.email);

      return medico;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }

  async loginPaciente(login: LoginDTO) {
    try {
      const cpfValid = await this.pacienteService.checkCPF(
        login.cpf,
        login.email,
      );

      if (!cpfValid) {
        throw new NotFoundException('Email e CPF incompatíveis.');
      }

      const valid = await this.pacienteService.checkPassword(
        login.senha,
        login.email,
      );

      if (!valid) {
        throw new NotFoundException('Credenciais inválidas.');
      }

      const paciente = await this.pacienteService.findByEmail(login.email);

      return paciente;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  }
}
