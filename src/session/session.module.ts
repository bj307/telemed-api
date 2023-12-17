import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AdmService } from 'src/adm/adm.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, AdmService],
})
export class SessionModule {}
