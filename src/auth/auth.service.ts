import { MedicoService } from './../medico/medico.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PacienteService } from 'src/paciente/paciente.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './model/payload';
import { AdmService } from 'src/adm/adm.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly medicoService: MedicoService,
    private readonly pacienteService: PacienteService,
    private readonly jwtService: JwtService,
    private readonly admService: AdmService,
  ) { }

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

      return {
        access_token: await this.token(adm, 'adm'),
      };
    } catch (error) {
      throw new Error(error.message);
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

      return {
        access_token: await this.token(medico, 'medico'),
      };
    } catch (error) {
      throw new Error(error.message);
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
      console.log('paciente', paciente);
      return {
        access_token: await this.token(paciente, 'paciente'),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async token(user: any, userType: string) {
    const payload: Payload = {
      nome: user.nome,
      userType: userType,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    return await this.gerarJwt(payload);
  }

  async gerarJwt(payload: Payload) {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao gerar token.');
    }
  }

  async verifyJwt(jwt: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(jwt);
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }
  }
}