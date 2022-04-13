import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health/health-check.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { DBConfigService } from './shared/services/db-config.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    HealthCheckModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (dbConfigService: DBConfigService) =>
        dbConfigService.postgresConfig,
      inject: [DBConfigService],
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
