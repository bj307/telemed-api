import * as admin from 'firebase-admin';
import { Sala } from '../dto/sala.interface';

export class ChatRepository {

    private db: admin.firestore.Firestore;

    private readonly colection = 'chats';

    constructor() {
        this.db = admin.firestore();
    }

    async adicionarUsuario(salaId: string, usuario: string) {
        const salaRef = this.db.collection(this.colection).doc(salaId);
        const sala = await salaRef.get();
        if (!sala.exists) {
            throw new Error('Sala não encontrada');
        }
        const usuarios = sala.data().usuarios;
        usuarios.push(usuario);
        return salaRef.update({ usuarios: usuarios });
    }

    async addASala(sala: Sala, usuarios: string[]) {
        if (!usuarios) {
            usuarios = [];
        }
        if (!sala.usuarios) {
            sala.usuarios = [];
        }
        sala.usuarios.push(...usuarios);
        return sala;
    }

    async getSalas() {
        const ref = this.db.collection(this.colection);
        const salas = await ref.get();
        return salas.docs.map(sala => sala.data());
    }
    

}