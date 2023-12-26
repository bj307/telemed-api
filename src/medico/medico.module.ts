import { Module, forwardRef } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [
    MedicoController, 
  ],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
