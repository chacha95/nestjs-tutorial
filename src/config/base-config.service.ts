import { ConfigService } from '@nestjs/config';

export class BaseConfigService {
  constructor(protected configService: ConfigService) {}

  // env check
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

  // type check
  protected getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  protected getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  protected getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  protected get(key: string): string {
    const value = this.configService.get<string>(key);

    // https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isnil
    if (value == null) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
