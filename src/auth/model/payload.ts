import { Role } from "src/roles/enum/role.enum";

export class Payload {
    nome: string;
    userType: string;
    email: string;
    role: Role;
}