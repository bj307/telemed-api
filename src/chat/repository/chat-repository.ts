import * as admin from 'firebase-admin';
import { Sala } from '../dto/sala.interface';

export class ChatRepository {

    private db: admin.firestore.Firestore;

    private readonly colection = 'chats';

    constructor() {
        this.db = admin.firestore();
    }

    async criarSala(sala: Sala, usuarios: string[]) {
        const ref = this.db.collection(this.colection).doc();
        const novaSala = {
            ...sala,
            usuarios: usuarios
        };
        return ref.set(novaSala);
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