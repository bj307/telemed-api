import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { MedicoRepository } from './Repository/medico.repository';
import { Role } from 'src/Role/role.enum';

@Injectable()
export class MedicoService {

  private readonly medicoRepository: MedicoRepository;

  constructor() {
    this.medicoRepository = new MedicoRepository();
  }

  async create(createMedicoDto: CreateMedicoDto) {
    try {
      const medicoExistenteEmail = await this.medicoRepository.buscarPorEmail(
        createMedicoDto.email,
      );

      if (medicoExistenteEmail) {
        throw new ConflictException('Email já está em uso');
      }

      const medicoExistenteCPF = await this.medicoRepository.buscarPorCPF(
        createMedicoDto.cpf,
      );

      if (medicoExistenteCPF) {
        throw new ConflictException('CPF já está em uso');
      }

      const medicoExistenteCRM = await this.medicoRepository.buscarPorCRM(
        createMedicoDto.crm,
      );

      if (medicoExistenteCRM) {
        throw new ConflictException('CRM já está em uso');
      }
      createMedicoDto.role = Role.Medico;
      return await this.medicoRepository.salvar(createMedicoDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar o médico');
    }
  }

  async findAll() {
    try {
      return this.medicoRepository.listar();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new Error('ID inválido');
    }
    try {
      return await this.medicoRepository.buscarID(id);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.medicoRepository.buscarPorEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const medico = await this.medicoRepository.buscarID(id);
      if (!medico) {
        throw new NotFoundException('Médico não encontrado');
      }
  
      if (medico.email !== updateMedicoDto.email) {
        const medicoExistenteEmail = await this.medicoRepository.buscarPorEmail(updateMedicoDto.email);
        if (medicoExistenteEmail) {
          throw new ConflictException('Email já está em uso');
        }
      }
  
      if (medico.cpf !== updateMedicoDto.cpf) {
        const medicoExistenteCPF = await this.medicoRepository.buscarPorCPF(updateMedicoDto.cpf);
        if (medicoExistenteCPF) {
          throw new ConflictException('CPF já está em uso');
        }
      }
  
      if (medico.crm !== updateMedicoDto.crm) {
        const medicoExistenteCRM = await this.medicoRepository.buscarPorCRM(updateMedicoDto.crm);
        if (medicoExistenteCRM) {
          throw new ConflictException('CRM já está em uso');
        }
      }
  
      updateMedicoDto.role = Role.Medico;
      return await this.medicoRepository.atualizar(id, updateMedicoDto);
  
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar o médico');
    }
  }

  async checkCRM(crm: string, email: string): Promise<boolean> {
    try {
      return await this.medicoRepository.checkCRM(crm, email);
    } catch (error) {
      throw error;
    }
  }

  async checkPassword(senha: string, email: string): Promise<boolean> {
    try {
      return await this.medicoRepository.checkPassword(senha, email);
    } catch (error) {
      throw error;
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
