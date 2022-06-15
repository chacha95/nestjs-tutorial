import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BaseConfigService } from './base-config.service';

@Injectable()
export class AppConfigService extends BaseConfigService {
  constructor(protected configService: ConfigService) {
    super(configService);
  }

  get docEnabled(): boolean {
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

  get config() {
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
}
