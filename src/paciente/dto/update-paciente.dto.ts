import { Role } from "src/auth/model/Role-enum";

export class UpdatePacienteDto {
  nome?: string;
  email?: string;
  senha?: string;
  cpf?: number;
  rg?: number;
  telefone?: number;
  role?: Role;
}
