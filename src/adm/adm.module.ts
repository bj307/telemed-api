import { Module } from '@nestjs/common';
import { AdmService } from './service/adm.service';
import { AdmController } from './controller/adm.controller';

@Module({
  controllers: [AdmController],
  providers: [AdmService],
  exports: [AdmService],
})
export class AdmModule {}
