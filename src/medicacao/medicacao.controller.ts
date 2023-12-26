import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { MedicacaoService } from './medicacao.service';
import { CreateMedicacaoDto } from './dto/create-medicacao.dto';
import { UpdateMedicacaoDto } from './dto/update-medicacao.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/model/role-enum';

@Controller('medicacao')
export class MedicacaoController {

  constructor(private readonly medicacaoService: MedicacaoService) { }

  @Post()
  @Roles(Role.MEDICO)
  public async create(@Body() createMedicacaoDto: CreateMedicacaoDto) {
    try {
      return await this.medicacaoService.create(createMedicacaoDto);
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao criar medicação',
        cause: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get()
  @Roles(Role.PACIENTE, Role.MEDICO)
  public async findAll() {
    try {
      return await this.medicacaoService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao listar as medicações',
        cause: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':id')
  @Roles(Role.PACIENTE, Role.MEDICO)
  public async findById(@Param('id') id: string) {
    try {
      return await this.medicacaoService.findById(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Erro ao buscar medicaçãoes com ID ${id}`,
        cause: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @Roles(Role.MEDICO)
  public async update(@Param('id') id: string, @Body() updateMedicacaoDto: UpdateMedicacaoDto) {
    try {
      return await this.medicacaoService.update(id, updateMedicacaoDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Erro ao atualizar a medicação com ID ${id}`,
        cause: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.MEDICO)
  public async remove(@Param('id') id: string) {
    try {
      return await this.medicacaoService.remove(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Erro ao deletar a medicação ${id}`,
        cause: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}