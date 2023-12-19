import {  InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicoResponseDto } from '../dto/response-medico.dto';

export class MedicoRepository {

    private readonly db: FirebaseFirestore.Firestore;

    private readonly collection: string = 'medicos';

    constructor() {
        this.db = admin.firestore();
    }

    async salvar(createMedicoDto: CreateMedicoDto) {
        try {
            createMedicoDto.senha = await bcrypt.hash(createMedicoDto.senha, 10);
            const docRef = await admin.firestore()
                .collection(this.collection)
                .add(createMedicoDto);

            return this.buscarID(docRef.id);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao salvar o médico');
        }
    }

    async listar() {
        try {
            const snapshot = await this.db.collection(this.collection).get();
            return snapshot.docs.map(doc => {
                const medico = doc.data();
                return {
                    id: doc.id,
                    nome: medico.nome,
                    especialidade: medico.especialidade,
                    email: medico.email
                } as MedicoResponseDto;
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao listar os médicos');
        }
    }

    async buscarID(id: string) {
        try {
            const snapshot = await this.db.collection(this.collection).doc(id).get();
            if (!snapshot.exists) {
                throw new NotFoundException('Médico não encontrado');
            }
            const medico = snapshot.data();
            return {
                id: snapshot.id,
                nome: medico.nome,
                especialidade: medico.especialidade,
                email: medico.email
            } as MedicoResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
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
                throw new NotFoundException('Médico não encontrado');
            }

            if (updateMedicoDto.senha) {
                updateMedicoDto.senha = await bcrypt.hash(updateMedicoDto.senha, 10);
            }

            await docRef.update({
                ...updateMedicoDto
            });

            return this.buscarID(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao atualizar o médico');
        }
    }

    async deletar(id: string) {
        const docRef = this.db.collection(this.collection).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new NotFoundException('Médico não encontrado');
        }

        await docRef.delete();
    }

    async buscarPorEmail(email: string): Promise<MedicoResponseDto | null> {
        try {
            const snapshot = await this.db.collection(this.collection).where('email', '==', email).get();
            if (snapshot.empty) {
                return null;
            }
    
            const doc = snapshot.docs[0];
            const medico = doc.data();
            return {
                id: doc.id,
                nome: medico.nome,
                especialidade: medico.especialidade,
                email: medico.email
            } as MedicoResponseDto;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar o médico pelo email');
        }
    }

    
    async buscarPorCPF(cpf: string): Promise<MedicoResponseDto | null> {
        try {
            const snapshot = await this.db.collection(this.collection).where('cpf', '==', cpf).get();
            if (snapshot.empty) {
                return null;
            }
    
            const doc = snapshot.docs[0];
            const medico = doc.data();
            return {
                id: doc.id,
                nome: medico.nome,
                especialidade: medico.especialidade,
                email: medico.email
            } as MedicoResponseDto;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar o médico pelo cpf');
        }
    }

    
    async buscarPorCRM(crm: string): Promise<MedicoResponseDto | null> {
        try {
            const snapshot = await this.db.collection(this.collection).where('crm', '==', crm).get();
            if (snapshot.empty) {
                return null;
            }
    
            const doc = snapshot.docs[0];
            const medico = doc.data();
            return {
                id: doc.id,
                nome: medico.nome,
                especialidade: medico.especialidade,
                email: medico.email
            } as MedicoResponseDto;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar o médico pelo crm');
        }
    }
}