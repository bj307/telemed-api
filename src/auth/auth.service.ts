import { MedicoService } from './../medico/medico.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PacienteService } from 'src/paciente/paciente.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './model/payload';

@Injectable()
export class AuthService {

  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private jwtService: JwtService) { }


  async signIn(email, pass) {

    const user = await this.validateUser(email, pass);

    if (user) {
      return {
        access_token: await this.token(user, user.userType)
      };
    } else {
      throw new UnauthorizedException("Usuario nao encontrado");
    }
  }

  async validateUser(email: string, senha: string) {

    try {
      const medico = await this.medicoService.findByEmail(email);
      const paciente = await this.pacienteService.findByEmail(email);
  
      let user;
      let userType;
  
      if (medico) {
        user = medico;
        userType = 'medico';
      } else if (paciente) {
        user = paciente;
        userType = 'paciente';
      }
      const passwordTrue = await this.compareSenhas(senha, user.senha);
      if (user && passwordTrue) {
        const { id, name, email } = user
        return { id, name, email , userType }
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }



  private token(user: any, userType: string) {
    const payload: Payload = {
      username: user.nome,
      userType: userType,
      email: user.email
    };
    return this.gerarJwt(payload);
  }


  async gerarJwt(payload: Payload) {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao gerar token');
    }
  }


  async verifyJwt(jwt: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(jwt);
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST); 
    }
  }

  async hashSenha(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async compareSenhas(senha: string, senhaHash: string): Promise<any> {
    try {
      return await bcrypt.compare(senha, senhaHash);
    } catch (error) {
      throw new Error('Erro ao comparar senhas');
    }
  }

}
