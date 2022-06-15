import { ValidationPipe } from '@nestjs/common';

export const customValidationPipe = new ValidationPipe({
  // type 변환
  transform: true,
  // @없는 속성 들어오면 해당 속성 제거
  whitelist: true,
  // DTO에 정의 되지 않은 값이 들어오면 request 자체를 막음
  // @IsString()과 같이 decorator를 무조건 달아야함
  forbidNonWhitelisted: true,
});