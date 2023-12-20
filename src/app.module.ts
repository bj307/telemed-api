import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmModule } from './adm/adm.module';
import { MedicoModule } from './medico/medico.module';
import { SessionModule } from './session/session.module';
import { PacienteModule } from './paciente/paciente.module';
import { MedicacaoModule } from './medicacao/medicacao.module';
import { ConsultaModule } from './consulta/consulta.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [AdmModule, MedicoModule, SessionModule, PacienteModule, MedicacaoModule, ConsultaModule,ChatGateway,
    
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
