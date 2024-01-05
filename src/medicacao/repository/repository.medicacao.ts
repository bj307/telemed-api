import { UpdateMedicacaoDto } from './../dto/update-medicacao.dto';
import * as admin from 'firebase-admin';
import { CreateMedicacaoDto } from '../dto/create-medicacao.dto';
import { ResponseMedicacaoDto } from '../dto/response.medicacao.dto';
import { MedicacaoNotFoundException } from '../exception/MedicacaoNotFoundException';
import { InternalServerErrorException } from '@nestjs/common';

export class MedicacaoRepository {

  private db: FirebaseFirestore.Firestore;

  private readonly collectionName: string = 'medicacao';

  constructor() {
    this.db = admin.firestore();
  }

  async createMedicacao(createMedicacaoDto: CreateMedicacaoDto) {
    try {
      const medicacaoRef = await this.db.collection(this.collectionName).add(createMedicacaoDto);
      return this.buscarID(medicacaoRef.id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async listar() {
    try {
      const snapshot = await this.db.collection(this.collectionName).get();
      const medicacaoPromises: Promise<ResponseMedicacaoDto>[] = [];

      snapshot.forEach(async (doc) => {
        const medicacaoPromise = this.buscarID(doc.id);
        medicacaoPromises.push(medicacaoPromise);
      });

      const medicacaos = await Promise.all(medicacaoPromises);
      return medicacaos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async buscarID(id: string) {
    try {
      const medicacaoSnapshot = await this.db.collection(this.collectionName).doc(id).get();
      if (!medicacaoSnapshot.exists) {
        throw new MedicacaoNotFoundException(`Medicação com ID ${id} não encontrada`);
      }
      return medicacaoSnapshot.data();
    } catch (error) {
      if (error instanceof MedicacaoNotFoundException) {
        throw MedicacaoNotFoundException;
      }
      throw new InternalServerErrorException();
    }
  }

  async updateMedicacao(id: string, medicacaoAtualizacao: UpdateMedicacaoDto) {
   
    try {
      const medicacaoRef = await this.db.collection(this.collectionName).doc(id);
      const doc = await medicacaoRef.get();
      if (!doc.exists) {
        throw new MedicacaoNotFoundException(id);
      }

      await medicacaoRef.update({
        ...medicacaoAtualizacao
      });

      return this.buscarID(id);
    } catch (error) {
      if (error instanceof MedicacaoNotFoundException) {
        throw MedicacaoNotFoundException;
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteMedicacao(id: string) {
    try {
      const medicacaoRef = await this.db.collection(this.collectionName).doc(id);
      const doc = await medicacaoRef.get();
      if (!doc.exists) {
        throw new MedicacaoNotFoundException(id);
      }

      await medicacaoRef.delete();

      return { id };
    } catch (error) {
      if (error instanceof MedicacaoNotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}