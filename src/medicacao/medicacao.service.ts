import { Injectable } from '@nestjs/common';
import { CreateMedicacaoDto } from './dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from './dto/update-medicacao.dto';
import { MedicacaoRepository } from './repository/repository.medicacao';

@Injectable()
export class MedicacaoService {

  private readonly medicacaoRepository: MedicacaoRepository;

  constructor() {
    this.medicacaoRepository = new MedicacaoRepository();
  }

  create(createMedicacaoDto: CreateMedicacaoDto) {
    return this.medicacaoRepository.createMedicacao(createMedicacaoDto);
  }

  findAll() {
    return this.medicacaoRepository.listar();
  }

  findById(id: string) {
    return this.medicacaoRepository.buscarID(id);
  }

  update(id: string, updateMedicacaoDto: UpdateMedicacaoDto) {
    return this.medicacaoRepository.updateMedicacao(id, updateMedicacaoDto);
  }

  remove(id: string) {
    return this.medicacaoRepository.deleteMedicacao(id);
  }
}
