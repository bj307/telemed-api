import { Role } from "src/Role/role.enum";

export class Payload {
    nome: string;
    userType: string;
    email: string;
    role: Role;
}