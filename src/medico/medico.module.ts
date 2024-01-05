import { Module, forwardRef } from '@nestjs/common';
import { MedicoService } from './service/medico.service';
import { MedicoController } from './controller/medico.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MedicoRepository } from './Repository/medico.repository';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [
    MedicoController, 
  ],
  providers: [MedicoService, MedicoRepository],
  exports: [MedicoService],
})
export class MedicoModule {}
