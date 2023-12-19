import { IsNotEmpty } from 'class-validator';
import { isNotEmpty } from 'class-validator';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    return await this.consultaRepository.createConsulta(createConsultaDto);
  }

  async listarConsultas() {
    return await this.consultaRepository.listar();
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
    console.log(responseConsulta);

    return responseConsulta;

  }

  async atualizarConsulta(id: string, updateConsultaDto: UpdateConsultaDto) {

    const consultaAtualizada = await this.consultaRepository.updateConsulta(id, updateConsultaDto);
    if (!consultaAtualizada) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }
    return consultaAtualizada;
  }

  async removerConsulta(id: string) {
    if (!id) {
      throw new BadRequestException("ID da consulta não informado");
    }

    if (!await this.consultaRepository.buscarID(id)) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
    }
    this.consultaRepository.deleteConsulta(id);
  }
}