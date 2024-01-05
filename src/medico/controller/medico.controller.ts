import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  Query,
} from '@nestjs/common';
import { MedicoService } from '../service/medico.service';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) { }

  @Post()
  public async create(@Body() createMedicoDto: CreateMedicoDto) {
    try {
      return await this.medicoService.create(createMedicoDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  public async findAll() {
    try {
      return await this.medicoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  public async findByEmail(@Query('email') email: string) {
    try {
      return await this.medicoService.findByEmail(email);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    try {
      return await this.medicoService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      return await this.medicoService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
