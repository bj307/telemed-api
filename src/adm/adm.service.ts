import { Injectable } from '@nestjs/common';
import { CreateAdmDto } from './dto/create-adm.dto';
import { UpdateAdmDto } from './dto/update-adm.dto';

@Injectable()
export class AdmService {
  create(createAdmDto: CreateAdmDto) {
    return 'This action adds a new adm';
  }

  findAll() {
    return `This action returns all adm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adm`;
  }

  update(id: number, updateAdmDto: UpdateAdmDto) {
    return `This action updates a #${id} adm`;
  }

  remove(id: number) {
    return `This action removes a #${id} adm`;
  }
}
