import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PacienteService } from 'src/paciente/paciente.service';
import { JwtModule } from '@nestjs/jwt';
import { MedicoModule } from 'src/medico/medico.module';
import * as dotenv from 'dotenv';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { LocalStrategy } from './strategy/local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AdmService } from 'src/adm/adm.service';

dotenv.config();

@Module({
  imports: [
    forwardRef(() => MedicoModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PacienteService,
    AuthGuard,
    LocalStrategy,
    LocalStrategy,
    RolesGuard,
    AdmService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    } /*, {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
*/,
  ],
  exports: [AuthModule],
})
export class AuthModule {}
