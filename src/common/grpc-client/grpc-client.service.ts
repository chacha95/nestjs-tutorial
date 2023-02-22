import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { Hero, HeroById } from './interfaces/grpc-client.interface';

interface HeroServce {
  findOne(data: HeroById): Hero;
}

@Injectable()
export class GrpcClientService {
  private heroService: HeroServce;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroServce>('HeroService');
  }

  findOne(data: HeroById): Hero {
    console.log(data);
    return { id: 1, name: 'hero' } as Hero;
  }
}
