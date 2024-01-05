import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { MedicacaoService } from '../service/medicacao.service';
import { CreateMedicacaoDto } from '../dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from '../dto/update-medicacao.dto';


@Controller('medicacao')
export class MedicacaoController {
  constructor(private readonly medicacaoService: MedicacaoService) { }

  @Post()
  public async create(@Body() createMedicacaoDto: CreateMedicacaoDto) {
    try {
      return this.medicacaoService.create(createMedicacaoDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  public async findAll() {
    try {
      return this.medicacaoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    try {
      return this.medicacaoService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  public async update(@Param('id') id: string, 
                        @Body() updateMedicacaoDto: UpdateMedicacaoDto) {
    try {
      return this.medicacaoService.update(id, updateMedicacaoDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      return this.medicacaoService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}