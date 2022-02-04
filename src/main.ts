import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  // Swagger set
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, doc);

  await app.listen(3000);
}
bootstrap();
