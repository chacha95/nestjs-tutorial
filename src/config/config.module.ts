import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './app-config.service';
import { TypeORMConfigService } from './typeorm-config.service';

const providers = [AppConfigService, TypeORMConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class ConfigModule {}
