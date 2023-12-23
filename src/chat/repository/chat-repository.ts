import * as admin from 'firebase-admin';
import { Chat } from '../dto/chat.dto';

export class ChatRepository {
    private db: admin.firestore.Firestore;

    constructor() {
        this.db = admin.firestore();
    }


}