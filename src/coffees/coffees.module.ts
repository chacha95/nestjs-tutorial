import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CoffeesController} from './coffees.controller';
import {CoffeesService} from './coffees.service';
import {Coffee} from './entities/coffee.entity';
import {Flavor} from './entities/flavor.entity';

@Module({
  // .forFeatrure는 어떤 Repository가 연동되 있는지 나타냄
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
