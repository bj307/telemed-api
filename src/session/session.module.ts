import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AdmService } from 'src/adm/adm.service';
import { PacienteService } from 'src/paciente/paciente.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, AdmService, PacienteService],
})
export class SessionModule {}
