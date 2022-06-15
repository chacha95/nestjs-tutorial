import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './services/app-config.service';
import { DBConfigService } from './services/db-config.service';

const providers = [AppConfigService, DBConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class CommonModule {}
