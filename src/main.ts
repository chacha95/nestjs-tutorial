import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { grpcClientOptions } from './common/grpc-client/grpc-client.options';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  // grpc client
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

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
