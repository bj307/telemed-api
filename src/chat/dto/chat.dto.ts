export class Chat {
    
    message: string;
    remetente: string;
    recebedor: string;

    constructor(Chat?: Partial<Chat>){
        Object.assign(this, Chat);
    }
}