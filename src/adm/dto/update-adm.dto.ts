import { PartialType } from '@nestjs/mapped-types';
import { CreateAdmDto } from './create-adm.dto';

export class UpdateAdmDto extends PartialType(CreateAdmDto) {}
