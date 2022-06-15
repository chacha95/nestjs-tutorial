import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { BaseConfigService } from './base-config.service';

@Injectable()
export class TypeORMConfigService extends BaseConfigService {
  constructor(protected configService: ConfigService) {
    super(configService);
  }

  get config(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'postgres',
      host: this.getString('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      database: this.getString('POSTGRES_DB'),
      username: this.getString('POSTGRES_USER'),
      password: this.getString('POSTGRES_PASSWORD'),
      synchronize: this.getBoolean('POSTGRES_SYNCHRONIZE'),
      autoLoadEntities: this.getBoolean('POSTGRES_AUTOLOADENTITIES'),
      migrationsRun: true,
    };
  }
}
