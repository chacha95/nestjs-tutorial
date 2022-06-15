import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './app-config.service';

const providers = [AppConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class ConfigModule {}
