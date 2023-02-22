import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

console.log(
  join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    './src/common/grpc-client/hero.proto',
  ),
);
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // url:
    //   process.env.METERING_AGENT_HOST + ':' + process.env.METERING_AGENT_PORT,
    // package: process.env.METERING_PACKAGE_NAME,
    // protoPath: join(__dirname, 'hero.proto'),
    package: 'hero',
    protoPath: join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      './src/common/grpc-client/hero.proto',
    ),
    // loader: {
    //   keepCase: true,
    //   longs: Number,
    //   enums: String,
    //   defaults: false,
    //   arrays: true,
    //   objects: true,
    //   includeDirs: [protoDir],
    // },
  },
};
