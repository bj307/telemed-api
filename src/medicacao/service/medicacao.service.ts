import {  BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicacaoDto } from '../dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from '../dto/update-medicacao.dto';
import { MedicacaoRepository } from '../repository/repository.medicacao';
import { MedicacaoNotFoundException } from '../exception/MedicacaoNotFoundException';
import { InvalidMedicacaoDataException } from '../exception/InvalidMedicacaoDataException';

@Injectable()
export class MedicacaoService {
  constructor(private readonly medicacaoRepository: MedicacaoRepository) { }

  async create(createMedicacaoDto: CreateMedicacaoDto) {
    if (!createMedicacaoDto) {
      throw new BadRequestException('Dados inválidos');
    }
    try {
      return await this.medicacaoRepository.createMedicacao(createMedicacaoDto);
    } catch (error) {
      throw new MedicacaoNotFoundException('Erro ao criar a medicação');
    }
  }

  async findAll() {
    try {
      return await this.medicacaoRepository.listar();
    } catch (error) {
      throw new MedicacaoNotFoundException('Erro ao listar as medicações');
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new InvalidMedicacaoDataException();
    }
    try {
      const medicacao = await this.medicacaoRepository.buscarID(id);
      if (!medicacao) {
        throw new MedicacaoNotFoundException(id);
      }
      return medicacao;
    } catch (error) {
      throw new MedicacaoNotFoundException(id);
    }
  }

  async update(id: string, updateMedicacaoDto: UpdateMedicacaoDto) {
    if (!id || !updateMedicacaoDto) {
      throw new InvalidMedicacaoDataException();
    }
    try {
      return await this.medicacaoRepository.updateMedicacao(id, updateMedicacaoDto);
    } catch (error) {
      throw new MedicacaoNotFoundException(id);
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new InvalidMedicacaoDataException();
    }
    try {
      return await this.medicacaoRepository.deleteMedicacao(id);
    } catch (error) {
      throw new MedicacaoNotFoundException(id);
    }
  }
}