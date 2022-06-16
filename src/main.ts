import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
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
      // .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }

  // Prisma Client Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(appConfig.config.port, () =>
    console.log(`listening to ${appConfig.config.port}.`),
  );
}

bootstrap();
