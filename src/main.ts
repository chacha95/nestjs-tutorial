import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
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
}
bootstrap();
