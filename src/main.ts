import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AppConfigService } from './common/services/app-config.service';
import { setupSwagger } from './common/utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  // CORS 설정
  app.enableCors();
  // Express app에서 header 관련 secure package
  app.use(helmet());
  app.setGlobalPrefix('api/');
  //global validation
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 정의 되지 않은 값이 들어오면 request 자체를 막음
      // @IsString()과 같이 decorator를 무조건 달아야함
      forbidNonWhitelisted: true,
      // @없는 속성 들어오면 해당 속성 제거
      whitelist: true,
      // type 자동 변환
      transform: true,
    }),
  );

  // OpenAPI 설정
  setupSwagger(app, appConfig);

  await app.listen(appConfig.appConfig.port, () =>
    console.log(`listening to ${appConfig.appConfig.port}.`),
  );
}

bootstrap();
