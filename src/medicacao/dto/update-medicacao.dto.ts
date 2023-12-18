import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicacaoDto } from './create-medicacao.dto';

export class UpdateMedicacaoDto extends PartialType(CreateMedicacaoDto) {}
