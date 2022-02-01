import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeesController} from './coffees/coffees.controller';

@Module({
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
