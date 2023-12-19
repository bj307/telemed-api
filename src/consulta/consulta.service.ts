import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ConsultaRepository } from './repository/consulta.repository';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { MedicoService } from 'src/medico/medico.service';
import { MedicacaoService } from 'src/medicacao/medicacao.service';
import { PacienteService } from 'src/paciente/paciente.service';
import { ResponseConsulta } from './dto/response-consulta.dto';


@Injectable()
export class ConsultaService {
  constructor(
    private readonly consultaRepository: ConsultaRepository,
    private readonly medicoService: MedicoService,
    private readonly medicacaoService: MedicacaoService,
    private readonly pacienteService: PacienteService
  ) { }

  async criarConsulta(createConsultaDto: CreateConsultaDto) {

    const medico = await this.medicoService.findById(createConsultaDto.medico);

    if (!medico) {
      throw new NotFoundException(`Médico com ID ${createConsultaDto.medico} não encontrado`);
    }

    const paciente = await this.pacienteService.findById(createConsultaDto.paciente);

    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${createConsultaDto.paciente} não encontrado`);
    }

    const medicacao = await this.medicacaoService.findById(createConsultaDto.medicacao);

    if (!medicacao) {
      throw new NotFoundException(`Medicação com ID ${createConsultaDto.medicacao} não encontrada`);
    }

    try {
      return await this.consultaRepository.createConsulta(createConsultaDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async listarConsultas() {
    try {
      return await this.consultaRepository.listar();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async buscarConsultaPorId(id: string) {
      const consulta = await this.consultaRepository.buscarID(id);

      console.log(consulta);

      if (!consulta) {
        throw new NotFoundException(`Consulta com  ${id} não encontrada`);
      }

      const medico = await this.medicoService.findById(consulta.medico);
      const paciente = await this.pacienteService.findById(consulta.paciente);
      const medicacao = await this.medicacaoService.findById(consulta.medicacao);

      const responseConsulta: ResponseConsulta = {
        id: consulta.id,
        medico: medico,
        paciente: paciente,
        medicacao: medicacao,
        status: consulta.status,
        duracao: consulta.duracaoConsulta,
        horario: consulta.horarioConsulta,
        data: consulta.dataDaConsulta

      }
      return responseConsulta;
  }

  async atualizarConsulta(id: string, updateConsultaDto: UpdateConsultaDto) {
    try {
      const consultaAtualizada = await this.consultaRepository.updateConsulta(id, updateConsultaDto);
      if (!consultaAtualizada) {
        throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
      }
      return consultaAtualizada;
      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removerConsulta(id: string) {

    if (!await this.consultaRepository.buscarID(id)) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }
    try {
      this.consultaRepository.deleteConsulta(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}