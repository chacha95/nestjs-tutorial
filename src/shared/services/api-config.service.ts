import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeCheck } from '../utils/type-check';

@Injectable()
export class ApiConfigService extends TypeCheck {
  constructor(protected configService: ConfigService) {
    super(configService);
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get appEnv(): string {
    return this.getString('APP_ENV');
  }

  get isDevelopment(): boolean {
    return this.appEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.appEnv === 'prod';
  }

  get isTest(): boolean {
    return this.appEnv === 'test';
  }

  get appConfig() {
    return {
      name: this.getString('APP_NAME'),
      port: this.getString('APP_PORT'),
      version: this.getString('APP_VERSION'),
    };
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
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
