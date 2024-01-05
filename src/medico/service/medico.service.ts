import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicoRepository } from '../Repository/medico.repository';
import { CpfEmUsoException, CrmEmUsoException, EmailEmUsoException } from '../exception/exception-medico';
import { MedicoNotFoundException } from '../exception/medicoNotFound';
import { InvalidMedicoDataException } from '../exception/medicoInvalida';
import { InternalServerErrorException } from 'src/Exception/InternalServerErrorException';

@Injectable()
export class MedicoService {

  private readonly medicoRepository: MedicoRepository;

  constructor() {
    this.medicoRepository = new MedicoRepository();
  }

  async create(createMedicoDto: CreateMedicoDto) {
    if (!createMedicoDto) {
      throw new InvalidMedicoDataException();
    }
    try {
      const medicoExistenteEmail = await this.medicoRepository.buscarPorEmail(
        createMedicoDto.email,
      );

      if (medicoExistenteEmail) {
        throw new EmailEmUsoException();
      }

      const medicoExistenteCPF = await this.medicoRepository.buscarPorCPF(
        createMedicoDto.cpf,
      );
      if (medicoExistenteCPF) {
        throw new CpfEmUsoException();
      }

      const medicoExistenteCRM = await this.medicoRepository.buscarPorCRM(
        createMedicoDto.crm,
      );
        console.log('medicoExistenteCRM', medicoExistenteCRM);
      if (medicoExistenteCRM) {
        throw new CrmEmUsoException();
      }
      console.log('createMedicoDto', createMedicoDto);
      return await this.medicoRepository.salvar(createMedicoDto);
    } catch (error) {
      if (error instanceof EmailEmUsoException || error instanceof CpfEmUsoException || error instanceof CrmEmUsoException) {
        throw error;
      }
      throw new  InternalServerErrorException("Erro ao criar o médico");
    }
  }

  async findAll() {
    try {
      return this.medicoRepository.listar();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar os médicos');
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new InvalidMedicoDataException();
    }
    try {
      const medico = this.medicoRepository.buscarID(id);
      if (!medico) {
        throw new MedicoNotFoundException(id);
      }
      return medico;
    } catch (error) {
      throw new MedicoNotFoundException(id);
    }
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new InvalidMedicoDataException();
    }
    try {
      const medico = await this.medicoRepository.buscarPorEmail(email);
      if (!medico) {
        throw new MedicoNotFoundException(email);
      }
      return medico;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o médico');
    }
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    if (!id || !updateMedicoDto) {
      throw new InvalidMedicoDataException();
    }
    try {
      const medico = await this.medicoRepository.buscarID(id);
      if (!medico) {
        throw new MedicoNotFoundException(id);
      }
      if (medico.email !== updateMedicoDto.email && updateMedicoDto.email !== undefined) {
        console.log('updateMedicoDto.email', updateMedicoDto.email);
        const medicoExistenteEmail = await this.medicoRepository.buscarPorEmail(updateMedicoDto.email);
        console.log('medicoExistenteEmail', medicoExistenteEmail);
        if (medicoExistenteEmail) {
          throw new EmailEmUsoException();
        }
      }

      if (medico.cpf !== updateMedicoDto.cpf && updateMedicoDto.cpf !== undefined) {
        const medicoExistenteCPF = await this.medicoRepository.buscarPorCPF(updateMedicoDto.cpf);
        if (medicoExistenteCPF) {
          throw new CpfEmUsoException();
        }
      }
      if (medico.crm !== updateMedicoDto.crm && updateMedicoDto.crm !== undefined) {
        console.log('updateMedicoDto.crm', updateMedicoDto.crm);
        const medicoExistenteCRM = await this.medicoRepository.buscarPorCRM(updateMedicoDto.crm);
        if (medicoExistenteCRM) {
          throw new CrmEmUsoException();
        }
      }
      return await this.medicoRepository.atualizar(id, updateMedicoDto);

    } catch (error) {
      if (error instanceof MedicoNotFoundException || error instanceof EmailEmUsoException || error instanceof CpfEmUsoException || error instanceof CrmEmUsoException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar o médico');
    }
  }

  async checkCRM(crm: string, email: string): Promise<boolean> {
    try {
      return await this.medicoRepository.checkCRM(crm, email);
    } catch (error) {
      throw InternalServerErrorException;
    }
  }

  async checkPassword(senha: string, email: string): Promise<boolean> {
    try {
      return await this.medicoRepository.checkPassword(senha, email);
    } catch (error) {
      throw InternalServerErrorException;
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID inválido');
    }
    try {
      return await this.medicoRepository.deletar(id);
    } catch (error) {
      throw new MedicoNotFoundException(id);
    }
  }
}
