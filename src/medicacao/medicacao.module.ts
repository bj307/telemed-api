import { Module } from '@nestjs/common';
import { MedicacaoService } from './medicacao.service';
import { MedicacaoController } from './medicacao.controller';

@Module({
  controllers: [MedicacaoController],
  providers: [MedicacaoService],
})
export class MedicacaoModule {}
