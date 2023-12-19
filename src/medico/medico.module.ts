import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';

@Module({
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
