import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ShowPacienteDto } from './dto/show-paciente.dto';
import { Public } from 'src/auth/decorator/is-public.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Public()
  @Post('cadastro')
  public async create(
    @Body() createPacienteDto: CreatePacienteDto,
  ): Promise<ShowPacienteDto> {
    try {
      return await this.pacienteService.create(createPacienteDto);
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  @Roles(Role.PACIENTE)
  public async findAll(): Promise<ShowPacienteDto[]> {
    const pacientes: ShowPacienteDto[] = await this.pacienteService.findAll();

    if (!pacientes) {
      return;
    }

    return pacientes;
  }

  @Get(':id')
  @Roles(Role.PACIENTE)
  public async findById(@Param('id') id: string): Promise<ShowPacienteDto> {
    const paciente: ShowPacienteDto = await this.pacienteService.findById(id);

    if (!paciente) {
      return;
    }

    return paciente;
  }

  @Get()
  @Roles(Role.PACIENTE)
  public async findByEmail(
    @Query('email') email: string,
  ): Promise<ShowPacienteDto> {
    const paciente: ShowPacienteDto =
      await this.pacienteService.findByEmail(email);

    if (!paciente) {
      return;
    }

    return paciente;
  }

  @Put(':id')
  @Roles(Role.PACIENTE)
  public async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ): Promise<ShowPacienteDto> {
    const paciente: ShowPacienteDto = await this.pacienteService.update(
      id,
      updatePacienteDto,
    );

    if (!paciente) {
      return;
    }

    return paciente;
  }

  @Delete(':id')
  @Roles(Role.PACIENTE)
  public async remove(@Param('id') id: string): Promise<string> {
    const message = await this.pacienteService.remove(id);
    if (!message) {
      return;
    }
    return message;
  }
}
