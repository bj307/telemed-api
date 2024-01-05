import { Injectable } from '@nestjs/common';
import { CreateAdmDto } from '../dto/create-adm.dto';
import { UpdateAdmDto } from '../dto/update-adm.dto';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { ShowAdmDto } from '../dto/show-adm.dto';

@Injectable()
export class AdmService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private readonly collection = 'Administrador';

  async create(createAdmDto: CreateAdmDto): Promise<ShowAdmDto> {
    try {
      createAdmDto.senha = await bcrypt.hash(createAdmDto.senha, 10);
      const novoAdm = await this.db
        .collection(this.collection)
        .add(createAdmDto);

      return await this.findById(novoAdm.id);
    } catch (error) {
      throw new Error('Erro ao criar: ' + error.message);
    }
  }

  async findById(id: string): Promise<ShowAdmDto> {
    try {
      const admRef = this.db.collection(this.collection).doc(id);

      const snapshot = await admRef.get();
      if (!snapshot.exists) {
        throw new Error('Administrador não existe.');
      }

      const data = snapshot.data();

      const showAdm: ShowAdmDto = {
        id: snapshot.id,
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
      };

      return showAdm;
    } catch (error) {
      throw new Error('Erro ao buscar: ' + error.message);
    }
  }

  async findByEmail(email: string): Promise<ShowAdmDto> {
    try {
      const collectionRef = this.db.collection(this.collection);

      const snapshot = await collectionRef.where('email', '==', email).get();
      if (snapshot.empty) {
        throw new Error('Administrador não existe.');
      }

      return await this.findById(snapshot.docs[0].id);
    } catch (error) {
      throw new Error('Erro ao buscar: ' + error.message);
    }
  }

  async update(id: string, updateAdmDto: UpdateAdmDto): Promise<ShowAdmDto> {
    try {
      const admRef = this.db.collection(this.collection).doc(id);

      if (!(await admRef.get()).exists) {
        throw new Error('Administrador não existe.');
      }

      if (updateAdmDto.senha) {
        updateAdmDto.senha = await bcrypt.hash(updateAdmDto.senha, 10);
      }

      await admRef.update({ ...updateAdmDto });

      return await this.findById(admRef.id);
    } catch (error) {
      throw new Error('Erro ao atualizar: ' + error.message);
    }
  }

  async checkPassword(senha: string, email: string): Promise<boolean> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('email', '==', email).get();

      if (snapshot.empty) {
        throw new Error('Administrador não existe.');
      }

      const adm = snapshot.docs[0].data();

      const valid = await bcrypt.compare(senha, adm.senha);

      return valid;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.db.collection(this.collection).doc(id).delete();
      return 'successfully deleted';
    } catch (error) {
      throw new Error('Erro ao deletar: ' + error.message);
    }
  }
}
