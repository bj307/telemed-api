import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consulta')
export class ConsultaController {

  constructor(private readonly consultaService: ConsultaService) { }

  @Post()
  async create(@Body() createConsultaDto: CreateConsultaDto) {

    const consulta = await this.consultaService.criarConsulta(createConsultaDto);
    if (!consulta) {
      throw new HttpException('Erro ao criar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Get()
  async findAll() {
    return await this.consultaService.listarConsultas();
  }

  @Get(':id')
  async findByID(@Param('id') id: string) {
    const consulta = await this.consultaService.buscarConsultaPorId(id);
    console.log(consulta);
    if (!consulta) {
      throw new HttpException('Erro ao buscar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.consultaService.atualizarConsulta(id, updateConsultaDto);
    if (!consulta) {
      throw new HttpException('Erro ao atualizar a consulta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return consulta;
  }

  @Delete(':id')
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