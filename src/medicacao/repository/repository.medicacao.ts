import { UpdateMedicacaoDto } from './../dto/update-medicacao.dto';
import * as admin from 'firebase-admin';
import { CreateMedicacaoDto } from '../dto/create-medicacao.dto';
import { ResponseMedicacaoDto } from '../dto/response.medicacao.dto';

export class MedicacaoRepository {

    private db: FirebaseFirestore.Firestore;

    private readonly collectionName: string = 'medicacao';

    constructor() {
        this.db = admin.firestore();
    }

    async createMedicacao(medicacaoDTO: CreateMedicacaoDto): Promise<any> {
        const medicacaoRef = await this.db.collection(this.collectionName)
            .add(medicacaoDTO);

        const medicacao = await medicacaoRef.get();
        return medicacao.data();
    }

    async listar(): Promise<any> {
        try {
            const medicacaoRef = await this.db.collection(this.collectionName).get();
            return medicacaoRef.docs.map(doc => {
               const medicacao = doc.data();
                return {
                    id: doc.id,
                    nome: medicacao.remedio,
                    dosagem: medicacao.dosagem,
                    uso: medicacao.uso
                } as ResponseMedicacaoDto;
            });
        } catch (error) {
            throw new Error('Erro ao listar medicacao');
        }

    }
    async buscarID(id: string): Promise<any> {
        try {
            const medicacaoRef = await this.db.collection(this.collectionName)
                .doc(id).get();
    
            if (!medicacaoRef.exists) {
                throw new Error(`Nenhuma medicação encontrada com o ID ${id}`);
            }
    
            const medicacao = medicacaoRef.data();
            return medicacao;
    
        } catch (error) {
            throw new Error('Erro ao buscar medicacao');
        }
    }

    async updateMedicacao(id: string, medicacaoAtualizacao: UpdateMedicacaoDto): Promise<any> {
        try {
            const medicacaoRef = await this.db.collection(this.collectionName).doc(id);
            const doc = await medicacaoRef.get();

            if (!doc.exists) {
                throw new Error('Medicacao não encontrada');
            }

            await medicacaoRef.update({
                ...medicacaoAtualizacao
            });

            return this.buscarID(id);
        } catch (error) {
            throw new Error('Erro ao atualizar medicacao');
        }
    }

    async deleteMedicacao(id: string): Promise<any> {
        try {
            const medicacaoRef = await this.db.collection(this.collectionName).doc(id).delete();
            return medicacaoRef;
        } catch (error) {
            throw new Error('Erro ao deletar medicacao');
        }
    }
}