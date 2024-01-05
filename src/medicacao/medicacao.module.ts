import { Module } from '@nestjs/common';
import { MedicacaoService } from './service/medicacao.service';
import { MedicacaoController } from './controller/medicacao.controller';
import { MedicacaoRepository } from './repository/repository.medicacao';

@Module({
  controllers: [MedicacaoController],
  providers: [MedicacaoService, MedicacaoRepository],
  exports: [MedicacaoService], 

})
export class MedicacaoModule {}
