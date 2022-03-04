import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

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
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'user 정보', description: 'user 정보 response' })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
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
    return this.usersService.updateByUserId(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteByUserId(+id);
  }
}
