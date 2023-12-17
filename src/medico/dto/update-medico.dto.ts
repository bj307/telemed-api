import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {}
