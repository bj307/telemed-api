import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { ShowPacienteDto } from './dto/show-paciente.dto';

@Injectable()
export class PacienteService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private readonly collection = 'Paciente';

  async create(createPacienteDto: CreatePacienteDto): Promise<ShowPacienteDto> {
    try {
      let pacienteExists = await this.findByCpf(createPacienteDto.cpf);

      if (pacienteExists) {
        throw new Error('CPF já cadastrado.');
      }

      pacienteExists = await this.findByEmail(createPacienteDto.email);

      if (pacienteExists) {
        throw new Error('Email já cadastrado.');
      }

      pacienteExists = await this.findByRg(createPacienteDto.rg);

      if (pacienteExists) {
        throw new Error('RG já cadastrado.');
      }

      createPacienteDto.senha = await bcrypt.hash(createPacienteDto.senha, 10);

      const novoPaciente = await this.db
        .collection(this.collection)
        .add(createPacienteDto);

      return await this.findById(novoPaciente.id);
    } catch (error) {
      throw new Error('Erro ao criar: ' + error.message);
    }
  }

  async findAll() {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.get();

      if (snapshot.empty) {
        throw new Error('Nenhum paciente encontrado.');
      }

      const pacientes: ShowPacienteDto[] = [];

      snapshot.forEach(async (doc) => {
        const paciente: ShowPacienteDto = await this.findById(doc.id);
        pacientes.push(paciente);
      });

      return pacientes;
    } catch (error) {}
  }

  async findById(id: string): Promise<ShowPacienteDto> {
    try {
      const pacienteRef = this.db.collection(this.collection).doc(id);
      const snapshot = await pacienteRef.get();
      if (!snapshot.exists) {
        throw new Error('Paciente não existe.');
      }

      const data = snapshot.data();

      const showPaciente: ShowPacienteDto = {
        id: snapshot.id,
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg,
        telefone: data.telefone,
      };

      return showPaciente;
    } catch (error) {}
  }

  async findByCpf(cpf: number): Promise<ShowPacienteDto> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('cpf', '==', cpf).get();
      if (snapshot.empty) {
        return;
      }

      return await this.findById(snapshot.docs[0].id);
    } catch (error) {
      throw new Error('Erro ao buscar: ' + error.message);
    }
  }

  async findByRg(rg: number): Promise<ShowPacienteDto> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('rg', '==', rg).get();
      if (snapshot.empty) {
        return;
      }

      return await this.findById(snapshot.docs[0].id);
    } catch (error) {
      throw new Error('Erro ao buscar: ' + error.message);
    }
  }

  async findByEmail(email: string): Promise<ShowPacienteDto> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('email', '==', email).get();
      if (snapshot.empty) {
        return;
      }

      return await this.findById(snapshot.docs[0].id);
    } catch (error) {
      throw new Error('Erro ao buscar: ' + error.message);
    }
  }

  async update(
    id: string,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<ShowPacienteDto> {
    try {
      const pacienteRef = this.db.collection(this.collection).doc(id);

      if (!(await pacienteRef.get()).exists) {
        throw new Error('Paciente não existe.');
      }

      if (updatePacienteDto.senha) {
        updatePacienteDto.senha = await bcrypt.hash(
          updatePacienteDto.senha,
          10,
        );
      }

      await pacienteRef.update({ ...updatePacienteDto });

      return await this.findById(pacienteRef.id);
    } catch (error) {
      throw new Error('Erro ao atualizar: ' + error.message);
    }
  }

  async checkPassword(senha: string, email: string): Promise<boolean> {
    try {
      const collectionRef = this.db.collection(this.collection);
      const snapshot = await collectionRef.where('email', '==', email).get();

      if (!snapshot.docs[0].exists) {
        throw new Error('Paciente não existe.');
      }

      const paciente = snapshot.docs[0].data();

      const valid = await bcrypt.compare(senha, paciente.senha);

      return valid;
    } catch (error) {
      throw new Error('Erro ao validar: ' + error.message);
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
