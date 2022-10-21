import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import LoggingInterceptor from './common/logging.interceptor';
import { customValidationPipe } from './common/pipes/validation.pipe';
import { ConfigModule } from './config/config.module';
import { TypeORMConfigService } from './config/typeorm-config.service';
import { HealthCheckModule } from './health/health-check.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HealthCheckModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          // level: 'log',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.sss' }),
          ),
        }),
      ],
    }),
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.DOTENV_CONFIG_PATH
        ? process.env.DOTENV_CONFIG_PATH
        : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (typeormConfigService: TypeORMConfigService) =>
        typeormConfigService.config,
      inject: [TypeORMConfigService],
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: customValidationPipe,
    },
    {
      provide: APP_FILTER,
      useValue: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
