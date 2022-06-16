import { Injectable } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { PULID } from '../common/pulid/pulid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // return Promise<object>
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        id: PULID.generate('us'),
        email: createUserDto.email,
        name: createUserDto.name,
      },
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
}
