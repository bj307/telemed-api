import { Role } from '../../auth/model/Role-enum';
export class ShowPacienteDto {
  id: string;
  nome: string;
  email: string;
  cpf: number;
  rg: number;
  telefone: number;
}
