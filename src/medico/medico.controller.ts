import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  public async create(@Body() createMedicoDto: CreateMedicoDto) {
    try {
      return await this.medicoService.create(createMedicoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: 'Erro ao criar medico',
          cause: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async findAll() {
    try {
      return await this.medicoService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: 'Erro ao listar medicos',
          cause: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async findByEmail(@Query('email') email: string) {
    try {
      return await this.medicoService.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao buscar o médico com email ${email}`,
          cause: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    try {
      return await this.medicoService.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: `Erro ao buscar o médico com ID ${id}`,
          cause: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    try {
      return await this.medicoService.update(id, updateMedicoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao atualizar o médico com ID ${id}`,
          cause: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      return await this.medicoService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao deletar o médico com ID ${id}`,
          cause: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
