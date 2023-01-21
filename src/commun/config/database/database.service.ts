import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Status } from 'src/private/status/entities/status.entity';
import { Role } from "../../../private/role/entities/role.entity";
import { User } from "../../../private/user/entities/user.entity";
import { Task } from "../../../private/task/entities/task.entity";
import { Commantaire } from "../../../private/commantaire/entities/commantaire.entity";

@Injectable()
export class DatabaseService {
    constructor(private readonly configService: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const type = this.configService.get('DB.PROVIDER');
        const host = this.configService.get('DB.HOST');
        const port = this.configService.get('DB.PORT');
        const username = this.configService.get('DB.USERNAME');
        const password = this.configService.get('DB.PASSWORD');
        const database = this.configService.get('DB.NAME_DB');

        return {
            type,
            host,
            port,
            username,
            password,
            database,
            entities: [Status, Role, User, Task, Commantaire],
            synchronize: true,
        };
    }
}
