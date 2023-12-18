import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicacaoDto } from './dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from './dto/update-medicacao.dto';
import { MedicacaoRepository } from './repository/repository.medicacao';

@Injectable()
export class MedicacaoService {

  private readonly medicacaoRepository: MedicacaoRepository;

  constructor() {
    this.medicacaoRepository = new MedicacaoRepository();
  }

  async create(createMedicacaoDto: CreateMedicacaoDto) {
    if (!createMedicacaoDto) {
      throw new BadRequestException();
    }
  
    try {
      return await this.medicacaoRepository.createMedicacao(createMedicacaoDto);
    } catch (error) {
      throw new Error(`Erro ao criar medicação: ${error.message}`);
    }
  }
  
  async findAll() {
    try {
      return await this.medicacaoRepository.listar();
    } catch (error) {
      throw new Error(`Erro ao listar medicação: ${error.message}`);
    }
  }
  
  async findById(id: string) {
    if (!id) {
      throw new BadRequestException();
    }
  
    try {
      const medicacao = await this.medicacaoRepository.buscarID(id);
      if (!medicacao) {
        throw new NotFoundException(id);
      }
      return medicacao;
    } catch (error) {
      throw new Error(`Erro ao buscar medicação id: ${error.message}`);
    }
  }
  
  async update(id: string, updateMedicacaoDto: UpdateMedicacaoDto) {
    if (!id || !updateMedicacaoDto) {
      throw new BadRequestException();
    }
  
    try {
      const updatedMedicacao = await this.medicacaoRepository.updateMedicacao(id, updateMedicacaoDto);
      if (!updatedMedicacao) {
        throw new NotFoundException(id);
      }
      return updatedMedicacao;
    } catch (error) {
      throw new Error(`Erro ao atualizar medicacao: ${error.message}`);
    }
  }
  
  async remove(id: string) {
    if (!id) {
      throw new BadRequestException();
    }
  
    try {
      const deletedMedicacao = await this.medicacaoRepository.deleteMedicacao(id);
      if (!deletedMedicacao) {
        throw new NotFoundException(id);
      }
      return deletedMedicacao;
    } catch (error) {
      throw new Error(`Erro ao deletar medicacao: ${error.message}`);
    }
  }
}