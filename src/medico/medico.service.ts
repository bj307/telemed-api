import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import * as admin from 'firebase-admin';
import { MedicoRepository } from './Repository/medico.repository';

@Injectable()
export class MedicoService {

  private readonly medicoRepository: MedicoRepository;

  constructor() {
    this.medicoRepository = new MedicoRepository();
  }

  async create(createMedicoDto: CreateMedicoDto) {
    try {
      const medicoExistente = await this.medicoRepository.buscarPorEmail(createMedicoDto.email);
      if (medicoExistente) {
        throw new ConflictException('Email já está em uso');
      }
      return await this.medicoRepository.salvar(createMedicoDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar o médico');
    }
  }

  async findAll() {
    return await this.medicoRepository.listar();
  }

  async findById(id: string) {
    return await this.medicoRepository.buscarID(id);
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const medico = await this.medicoRepository.buscarID(id);
      if (!medico) {
        throw new NotFoundException('Médico não encontrado');
      }
      return await this.medicoRepository.atualizar(id, updateMedicoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar o médico');
    }
  }

  async remove(id: string) {
    try {
      const medico = await this.medicoRepository.buscarID(id);
      if (!medico) {
        throw new NotFoundException('Médico não encontrado');
      }
      return await this.medicoRepository.deletar(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao deletar o médico');
    }
  }

}
