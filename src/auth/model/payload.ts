import { Role } from "src/auth/model/role-enum";

export class Payload {
    nome: string;
    userType: string;
    email: string;
    role: Role;
}