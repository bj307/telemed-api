import { UpdateMedicacaoDto } from './../dto/update-medicacao.dto';
import * as admin from 'firebase-admin';
import { CreateMedicacaoDto } from '../dto/create-medicacao.dto';
import { ResponseMedicacaoDto } from '../dto/response.medicacao.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MedicacaoRepository {

  private db: FirebaseFirestore.Firestore;

  private readonly collectionName: string = 'medicacao';

  constructor() {
    this.db = admin.firestore();
  }

  async createMedicacao(createMedicacaoDto: CreateMedicacaoDto) {
    if (!createMedicacaoDto) {
      throw new BadRequestException();
    }

    try {
      const medicacaoRef = await this.db.collection(this.collectionName).add(createMedicacaoDto);
      return this.buscarID(medicacaoRef.id);
    } catch (error) {
      throw new Error(`Erro ao criar medicação: ${error.message}`);
    }
  }

  async listar() {
    try {
      const snapshot = await this.db.collection(this.collectionName).get();
      return snapshot.docs.map(doc => {
        const medicacao = doc.data();
        return {
          id: doc.id,
          remedio: medicacao.remedio,
          uso: medicacao.uso,
          dosagem: medicacao.dosagem
        } as ResponseMedicacaoDto;
      });
    } catch (error) {
      throw new Error(`Erro ao listar medicação: ${error.message}`);
    }
  }

  async buscarID(id: string) {
    if (!id) {
      throw new BadRequestException();
    }
    try {
      const medicacaoSnapshot = await this.db.collection(this.collectionName)
        .doc(id).get();
      if (!medicacaoSnapshot.exists) {
        throw new NotFoundException(id);
      }
      return medicacaoSnapshot.data();
    } catch (error) {
      throw new Error(`Erro ao buscar medicação por ID: ${error.message}`);
    }
  }

  async updateMedicacao(id: string, medicacaoAtualizacao: UpdateMedicacaoDto) {
    if (!id || !medicacaoAtualizacao) {
      throw new BadRequestException();
    }

    try {
      const medicacaoRef = await this.db.collection(this.collectionName).doc(id);
      const doc = await medicacaoRef.get();

      if (!doc.exists) {
        throw new NotFoundException(id);
      }

      await medicacaoRef.update({
        ...medicacaoAtualizacao
      });

      return this.buscarID(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar medicação: ${error.message}`);
    }
  }

  async deleteMedicacao(id: string) {
    if (!id) {
      throw new BadRequestException();
    }

    try {
      const medicacaoRef = await this.db.collection(this.collectionName).doc(id);
      const doc = await medicacaoRef.get();

      if (!doc.exists) {
        throw new NotFoundException(id);
      }

      await medicacaoRef.delete();
      return { id };
    } catch (error) {
      throw new Error(`Erro ao deletar medicação: ${error.message}`);
    }
  }
}