import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigCheck } from '../utils/config-check';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBConfigService extends ConfigCheck {
  constructor(protected configService: ConfigService) {
    super(configService);
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
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
