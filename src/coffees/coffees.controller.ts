import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return `okay`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return `${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() body) {
    return `Patch ${id}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return `Delete ${id}`;
  }
}
