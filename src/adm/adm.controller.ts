import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdmService } from './adm.service';
import { CreateAdmDto } from './dto/create-adm.dto';
import { UpdateAdmDto } from './dto/update-adm.dto';

@Controller('adm')
export class AdmController {
  constructor(private readonly admService: AdmService) {}

  @Post()
  create(@Body() createAdmDto: CreateAdmDto) {
    return this.admService.create(createAdmDto);
  }

  @Get()
  findAll() {
    return this.admService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdmDto: UpdateAdmDto) {
    return this.admService.update(+id, updateAdmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.admService.remove(+id);
  }
}
