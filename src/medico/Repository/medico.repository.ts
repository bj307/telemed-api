import {
  InternalServerErrorException,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicoResponseDto } from '../dto/response-medico.dto';
import { MedicoNotFoundException } from '../exception/medicoNotFound';

export class MedicoRepository {
  private readonly db: FirebaseFirestore.Firestore;

  private readonly collection: string = 'Medicos';

  constructor() {
    this.db = admin.firestore();
  }

  async salvar(createMedicoDto: CreateMedicoDto) {
    try {
      createMedicoDto.senha = await bcrypt.hash(createMedicoDto.senha, 10);
      const docRef = await admin
        .firestore()
        .collection(this.collection)
        .add(createMedicoDto);

      return this.buscarID(docRef.id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar o médico');
    }
  }

  async listar() {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.get();

      if (snapshot.empty) {
        throw new Error('Nenhum Médico encontrado.');
      }

      const medicosPromises: Promise<MedicoResponseDto>[] = [];

      snapshot.forEach(async (doc) => {
        const medicoPromise = this.buscarID(doc.id);
        medicosPromises.push(medicoPromise);
      });

      const medicos = await Promise.all(medicosPromises);
      return medicos;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar os médicos, não tem cadastro de médicos.');
    }
  }

  async buscarID(id: string): Promise<MedicoResponseDto> {
    try {
      const snapshot = await this.db.collection(this.collection).doc(id).get();
      if (!snapshot.exists) {
        throw new MedicoNotFoundException(id);
      }
      const medico = snapshot.data();
      return {
        id: snapshot.id,
        nome: medico.nome,
        especialidade: medico.especialidade,
        email: medico.email,
        cpf: medico.cpf,
        crm: medico.crm,
        telefone: medico.telefone,
        endereco: medico.endereco
      } as MedicoResponseDto;

    } catch (error) {
      if (error instanceof MedicoNotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar o médico');
    }
  }

  async atualizar(id: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const docRef = this.db.collection(this.collection).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new MedicoNotFoundException('Médico não encontrado');
      }

      if (updateMedicoDto.senha) {
        updateMedicoDto.senha = await bcrypt.hash(updateMedicoDto.senha, 10);
      }

      const updateData = { ...updateMedicoDto };

      await docRef.update(updateData);

      return this.buscarID(id);
    } catch (error) {
      if (error instanceof MedicoNotFoundException) {
        throw MedicoNotFoundException;
      }
      throw new InternalServerErrorException();
    }
  }

  async deletar(id: string) {
    const docRef = this.db.collection(this.collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new MedicoNotFoundException('Médico não encontrado');
    }

    await docRef.delete();
  }

  async buscarPorEmail(email: string): Promise<MedicoResponseDto | null> {
    try {
      const snapshot = await this.db
        .collection(this.collection)
        .where('email', '==', email)
        .get();
        console.log(snapshot.empty ? null : snapshot);

      if (snapshot.empty) {
        return null;
      }
      const doc = snapshot.docs[0];

      const data = doc.data();
      data.id = doc.id;
      console.log(data);
      return data;

    } catch (error) {
      console.log('Erro ao buscar médico:', error);
      throw new InternalServerErrorException(
        'Erro ao buscar o médico pelo email',
      );
    }
  }

  async buscarPorCPF(cpf: string): Promise<MedicoResponseDto | null> {
    try {
      const snapshot = await this.db
        .collection(this.collection)
        .where('cpf', '==', cpf)
        .get();
      if (snapshot.empty) {
       return null;
      }

      const doc = snapshot.docs[0];
      return this.buscarID(doc.id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar o médico pelo cpf',
      );
    }
  }

  async buscarPorCRM(crm: string): Promise<MedicoResponseDto | null> {
    try {
      const snapshot = await this.db
        .collection(this.collection)
        .where('crm', '==', crm)
        .get();
      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return this.buscarID(doc.id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar o médico pelo crm',
      );
    }
  }

  async checkCRM(crm: string, email: string): Promise<boolean> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('email', '==', email).get();

      if (!snapshot.docs[0].exists) {
        throw new Error('Medico não existe.');
      }

      const medico = snapshot.docs[0].data();

      if (medico.crm == crm) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Erro ao validar: ' + error.message);
    }
  }

  async checkPassword(senha: string, email: string): Promise<boolean> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('email', '==', email).get();

      if (!snapshot.docs[0].exists) {
        throw new Error('Medico não existe.');
      }

      const medico = snapshot.docs[0].data();

      const valid = await bcrypt.compare(senha, medico.senha);

      return valid;
    } catch (error) {
      throw new Error('Erro ao validar: ' + error.message);
    }
  }
}
