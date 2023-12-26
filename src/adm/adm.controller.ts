import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdmService } from './adm.service';
import { CreateAdmDto } from './dto/create-adm.dto';
import { UpdateAdmDto } from './dto/update-adm.dto';
import { ShowAdmDto } from './dto/show-adm.dto';
import { Public } from 'src/auth/decorator/is-public.decorator';

@Controller('adm')
export class AdmController {
  constructor(private readonly admService: AdmService) {}

  @Public()
  @Post('cadastro')
  //@Roles(Role.ADMIN)
  public async create(@Body() createAdmDto: CreateAdmDto): Promise<ShowAdmDto> {
    const administrador: ShowAdmDto =
      await this.admService.create(createAdmDto);
    if (!administrador) {
      return;
    }
    return administrador;
  }

  @Get(':id')
  //@Roles(Role.ADMIN)
  public async findById(@Param('id') id: string): Promise<ShowAdmDto> {
    const administrador: ShowAdmDto = await this.admService.findById(id);
    if (!administrador) {
      return;
    }
    return administrador;
  }

  @Put(':id')
  //@Roles(Role.ADMIN)
  public async update(
    @Param('id') id: string,
    @Body() updateAdmDto: UpdateAdmDto,
  ): Promise<ShowAdmDto> {
    const administrador: ShowAdmDto = await this.admService.update(
      id,
      updateAdmDto,
    );
    if (!administrador) {
      return;
    }
    return administrador;
  }

  @Delete(':id')
  //@Roles(Role.ADMIN)
  public async remove(@Param('id') id: string): Promise<string> {
    const message = await this.admService.remove(id);
    if (!message) {
      return;
    }
    return message;
  }
}
