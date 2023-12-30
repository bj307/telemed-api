import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { MedicoRepository } from 'src/medico/Repository/medico.repository';
import { PacienteService } from 'src/paciente/paciente.service';
import { MedicacaoRepository } from 'src/medicacao/repository/repository.medicacao';
import { ConsultaRepository } from './repository/consulta.repository';
import { MedicoService } from 'src/medico/medico.service';
import { MedicacaoService } from 'src/medicacao/medicacao.service';

@Module({
  controllers: [ConsultaController],
  providers: [ConsultaService, ConsultaRepository, MedicoService, PacienteService, MedicacaoService],
  exports: [ConsultaService]
})
export class ConsultaModule {}
