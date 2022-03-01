import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from '../services/app-config.service';

export function setupSwagger(
  app: INestApplication,
  apiConfigService: AppConfigService,
): void {
  const options = new DocumentBuilder()
    .setTitle(apiConfigService.appConfig.name)
    .setVersion(apiConfigService.appConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
