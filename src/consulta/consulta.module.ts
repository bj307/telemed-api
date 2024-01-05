import { Module } from '@nestjs/common';
import { ConsultaService } from './service/consulta.service';
import { ConsultaController } from './controller/consulta.controller';
import { MedicoRepository } from 'src/medico/Repository/medico.repository';
import { PacienteService } from 'src/paciente/service/paciente.service';
import { MedicacaoRepository } from 'src/medicacao/repository/repository.medicacao';
import { ConsultaRepository } from './repository/consulta.repository';
import { MedicoService } from 'src/medico/service/medico.service';
import { MedicacaoService } from 'src/medicacao/service/medicacao.service';
import { MedicacaoModule } from 'src/medicacao/medicacao.module';

@Module({
  imports: [MedicacaoModule],
  controllers: [ConsultaController],
  providers: [
    ConsultaService, 
    ConsultaRepository, 
    MedicoService, 
    PacienteService
    ],
  exports: [ConsultaService]
})
export class ConsultaModule {}
