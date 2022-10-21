import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  app.enableCors();
  app.setGlobalPrefix('api/');

  // OpenAPI docs
  if (appConfig.docEnabled) {
    const options = new DocumentBuilder()
      .setTitle(appConfig.config.name)
      .setVersion(appConfig.config.version)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(appConfig.config.port, () =>
    console.log(`listening to ${appConfig.config.port}.`),
  );
}

bootstrap();
