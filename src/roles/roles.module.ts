import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [RolesController],
  exports: [RolesGuard],
  providers: [RolesService, RolesGuard,
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }
],
})
export class RolesModule {}
