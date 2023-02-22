import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { grpcClientOptions } from './grpc-client.options';
import { GrpcClientService } from './grpc-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [GrpcClientService],
  exports: [GrpcClientService],
})
export class GrpcClientModule {}
