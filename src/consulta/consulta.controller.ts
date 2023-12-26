import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/model/Role-enum';

@Controller('consulta')
export class ConsultaController {

  constructor(private readonly consultaService: ConsultaService) { }

  @Post()
  @Roles(Role.PACIENTE, Role.MEDICO)
  async create(@Body() createConsultaDto: CreateConsultaDto) {

    const consulta = await this.consultaService.criarConsulta(createConsultaDto);
    if (!consulta) {
      throw new HttpException('Erro ao criar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Get()
  @Roles(Role.PACIENTE, Role.MEDICO)
  async findAll() {
    return await this.consultaService.listarConsultas();
  }

  @Get(':id')
  @Roles(Role.PACIENTE, Role.MEDICO)
  async findByID(@Param('id') id: string) {
    const consulta = await this.consultaService.buscarConsultaPorId(id);
    console.log(consulta);
    if (!consulta) {
      throw new HttpException('Erro ao buscar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Put(':id')
  @Roles(Role.PACIENTE, Role.MEDICO)
  async update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.consultaService.atualizarConsulta(id, updateConsultaDto);
    if (!consulta) {
      throw new HttpException('Erro ao atualizar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Delete(':id')
  @Roles(Role.PACIENTE, Role.MEDICO)
  async remove(@Param('id') id: string) {

    try {
      const consulta = await this.consultaService.removerConsulta(id);
    } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
      throw new HttpException('Erro ao deletar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}