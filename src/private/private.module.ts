import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { CommantaireModule } from './commantaire/commantaire.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TaskModule,
    UserModule,
    StatusModule,
    CommantaireModule,
    RoleModule,
  ],
})
export class PrivateModule {}
