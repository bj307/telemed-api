import { Module } from '@nestjs/common';
import { AdmService } from './adm.service';
import { AdmController } from './adm.controller';

@Module({
  controllers: [AdmController],
  providers: [AdmService],
})
export class AdmModule {}
