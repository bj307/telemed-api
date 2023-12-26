import { Role } from "src/auth/model/Role-enum";

export class MedicoResponseDto {
    id?: string;
    nome?: string;
    especialidade?: string;
    email?: string;
    crm?: string;
    cpf?: string;
    rg?: string;
    endereco?: string;
    telefone?: string;
    role?: Role;
}