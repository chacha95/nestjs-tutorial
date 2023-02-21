import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('user API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'user 생성', description: 'user 생성' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 user 정보',
    description: '모든 user 정보 response',
  })
  async listUsers() {
    return this.usersService.listUser();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'user 정보 update',
    description: 'user 정보 update',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'user 정보', description: 'user 정보 response' })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @Get()
  @ApiOperation({ summary: 'list user', description: 'list user' })
  async listUser() {
    return this.usersService.listUser();
  }
}
