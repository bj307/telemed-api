import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    controllers: [],
    providers: [
        RolesGuard,
       {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }]
    ,
})
export class RoleModule { }



