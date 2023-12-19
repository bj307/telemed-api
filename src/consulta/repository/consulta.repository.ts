import * as admin from 'firebase-admin';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { UpdateConsultaDto } from '../dto/update-consulta.dto';
import { ConflictException } from '@nestjs/common';

export class ConsultaRepository {

  private collectionName = 'consulta';
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async createConsulta(createConsultaDto: CreateConsultaDto) {

    const horarioOcupado = await this.verificarHorario(
      createConsultaDto.medico,
      createConsultaDto.dataDaConsulta,
      createConsultaDto.horarioConsulta
    );

    if (horarioOcupado) {
      throw new ConflictException('Já existe uma consulta agendada para este médico neste horário.');
    }

    const consultaRef = await this.db.collection(this.collectionName).add(createConsultaDto);
    return this.buscarID(consultaRef.id);
  }

  async listar() {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async buscarID(id: string) {
    const consultaSnapshot = await this.db.collection(this.collectionName).doc(id).get();
    return consultaSnapshot.data();
  }

  async updateConsulta(id: string, consultaAtualizacao: UpdateConsultaDto) {

    const consultaRef = await this.db.collection(this.collectionName).doc(id);

    const buscarConsultaAntiga = await this.buscarID(id);

    await this.verificarChoqueDeHorario(consultaAtualizacao, buscarConsultaAntiga);


    await consultaRef.update({
      ...consultaAtualizacao
    });
    return this.buscarID(id);
  }

  async deleteConsulta(id: string) {
    const consultaRef = await this.db.collection(this.collectionName).doc(id);
    await consultaRef.delete();
    return { id };
  }

  private async verificarHorario(medico: string, dataDaConsulta: Date, horarioConsulta: string) {

    console.log(medico, dataDaConsulta, horarioConsulta);

    if (medico === undefined || dataDaConsulta === undefined || horarioConsulta === undefined) {
      throw new Error('Médico, data da consulta e horário da consulta não podem ser undefined');
    }

    const snapshot = await this.db.collection(this.collectionName)
      .where('medico', '==', medico)
      .where('dataDaConsulta', '==', dataDaConsulta)
      .where('horarioConsulta', '==', horarioConsulta)
      .get();

    return !snapshot.empty;
  }

  private async verificarChoqueDeHorario(consultaAtualizacao: UpdateConsultaDto, buscarConsultaAntiga) {
    if (consultaAtualizacao.dataDaConsulta == undefined && consultaAtualizacao.horarioConsulta == undefined) {
      const horarioOcupado = await this.verificarHorario(
        consultaAtualizacao.medico,
        buscarConsultaAntiga.dataDaConsulta,
        buscarConsultaAntiga.horarioConsulta
      );
      if (horarioOcupado) {
        throw new ConflictException('Já existe uma consulta agendada para este médico neste horário.');
      }
    }

    if (consultaAtualizacao.dataDaConsulta == undefined && consultaAtualizacao.horarioConsulta != undefined) {
      const horarioOcupado = await this.verificarHorario(
        consultaAtualizacao.medico,
        buscarConsultaAntiga.dataDaConsulta,
        consultaAtualizacao.horarioConsulta
      );
      if (horarioOcupado) {
        throw new ConflictException('Já existe uma consulta agendada para este médico neste horário.');
      }
    }

    if (consultaAtualizacao.dataDaConsulta != undefined && consultaAtualizacao.horarioConsulta == undefined) {
      const horarioOcupado = await this.verificarHorario(
        buscarConsultaAntiga.medico,
        consultaAtualizacao.dataDaConsulta,
        consultaAtualizacao.horarioConsulta
      );
      if (horarioOcupado) {
        throw new ConflictException('Já existe uma consulta agendada para este médico neste horário.');
      }
    }

    if (consultaAtualizacao.medico != undefined &&  
          consultaAtualizacao.dataDaConsulta != undefined && 
          consultaAtualizacao.horarioConsulta != undefined) {
      
          const horarioOcupado = await this.verificarHorario(
        consultaAtualizacao.medico,
        consultaAtualizacao.dataDaConsulta,
        consultaAtualizacao.horarioConsulta
      );
      if (horarioOcupado) {
        throw new ConflictException('Já existe uma consulta agendada para este médico neste horário.');
      }
    }
  }

}