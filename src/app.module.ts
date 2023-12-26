import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmModule } from './adm/adm.module';
import { MedicoModule } from './medico/medico.module';
import { SessionModule } from './session/session.module';
import { PacienteModule } from './paciente/paciente.module';
import { MedicacaoModule } from './medicacao/medicacao.module';
import { ConsultaModule } from './consulta/consulta.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AdmModule,
    MedicoModule,
    SessionModule,
    PacienteModule,
    MedicacaoModule,
    ConsultaModule,
    ChatModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
