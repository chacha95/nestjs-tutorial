import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { customValidationPipe } from './common/pipes/validation.pipe';
import { HealthCheckModule } from './health/health-check.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HealthCheckModule,
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.DOTENV_CONFIG_PATH
        ? process.env.DOTENV_CONFIG_PATH
        : '.env',
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: customValidationPipe
    },
    {
      provide: APP_FILTER,
      useValue: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
