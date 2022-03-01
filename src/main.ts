import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfig: ApiConfigService =
    app.get<ApiConfigService>(ApiConfigService);

  // CORS 설정
  app.enableCors();
  // Express app에서 header 관련 secure package
  app.use(helmet());
  app.setGlobalPrefix('api/');
  //global validation
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 정의 되지 않은 값이 들어오면 request 자체를 막음
      forbidNonWhitelisted: true,
      // @없는 속성 들어오면 해당 속성 제거
      whitelist: true,
      // type 자동 변환
      transform: true,
    }),
  );

  // OpenAPI 설정
  setupSwagger(app, apiConfig);

  await app.listen(apiConfig.appConfig.port, () =>
    console.log(`listening to ${apiConfig.appConfig.port}.`),
  );
}

bootstrap();
