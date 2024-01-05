import { Module } from '@nestjs/common';
import { PacienteService } from './service/paciente.service';
import { PacienteController } from './controller/paciente.controller';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService],
})
export class PacienteModule {}
