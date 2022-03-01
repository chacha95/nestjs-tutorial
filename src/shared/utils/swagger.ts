import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiConfigService } from '../services/api-config.service';

export function setupSwagger(
  app: INestApplication,
  apiConfigService: ApiConfigService,
): void {
  const options = new DocumentBuilder()
    .setTitle(apiConfigService.appConfig.name)
    .setVersion(apiConfigService.appConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
