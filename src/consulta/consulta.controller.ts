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
      throw new NotFoundException('Consulta não pôde ser criada');
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
      throw new NotFoundException('Consulta não encontrada');
    }
    return consulta;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.consultaService.atualizarConsulta(id, updateConsultaDto);
    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }
    return consulta;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const consulta = await this.consultaService.removerConsulta(id);

    if (consulta === undefined) {
      throw new NotFoundException('Consulta não encontrada');
    }
  }
}