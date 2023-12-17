import { Test, TestingModule } from '@nestjs/testing';
import { MedicoController } from './medico.controller';
import { MedicoService } from './medico.service';

describe('MedicoController', () => {
  let controller: MedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
      providers: [MedicoService],
    }).compile();

    controller = module.get<MedicoController>(MedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
