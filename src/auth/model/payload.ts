import { Role } from 'src/auth/model/Role-enum';

export class Payload {
  id: string;
  nome: string;
  userType: string;
  email: string;
  role?: Role;
}
