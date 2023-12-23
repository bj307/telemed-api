import * as admin from 'firebase-admin';
import { Chat } from '../dto/chat.dto';

export class ChatRepository {
    private db: admin.firestore.Firestore;

    constructor() {
        this.db = admin.firestore();
    }

    public async getChats(): Promise<Chat[]> {
        const snapshot = await this.db.collection('chats').get();
        return snapshot.docs.map(doc => doc.data() as Chat);
    }

    public async addChat(chat: Chat){
        return this.db.collection('chats').add(chat);
    }
}