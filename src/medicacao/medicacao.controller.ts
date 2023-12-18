import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MedicacaoService } from './medicacao.service';
import { CreateMedicacaoDto } from './dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from './dto/update-medicacao.dto';

@Controller('medicacao')
export class MedicacaoController {

  constructor(private readonly medicacaoService: MedicacaoService) { }

  @Post()
  public async create(@Body() createMedicacaoDto: CreateMedicacaoDto) {
    return this.medicacaoService.create(createMedicacaoDto);
  }

  @Get()
  public async findAll() {
    return this.medicacaoService.findAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.medicacaoService.findById(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateMedicacaoDto: UpdateMedicacaoDto) {
    return this.medicacaoService.update(id, updateMedicacaoDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.medicacaoService.remove(id);
  }
}
