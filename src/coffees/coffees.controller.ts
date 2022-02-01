import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {CoffeesService} from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQuery) {
    // 화면에 몇개나 보여주는가 pagination을 query로 처리 가능
    const {limit, offset} = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
