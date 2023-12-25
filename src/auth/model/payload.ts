import { Role } from "src/auth/enum/role.enum";

export class Payload {
    nome: string;
    userType: string;
    email: string;
    role: Role;
}