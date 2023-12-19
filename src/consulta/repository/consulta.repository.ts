import * as admin from 'firebase-admin';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { UpdateConsultaDto } from '../dto/update-consulta.dto';

export class ConsultaRepository {
  private collectionName = 'consulta';
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async createConsulta(createConsultaDto: CreateConsultaDto) {
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
}