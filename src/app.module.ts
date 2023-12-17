import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmModule } from './adm/adm.module';
import { MedicoModule } from './medico/medico.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [AdmModule, MedicoModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
