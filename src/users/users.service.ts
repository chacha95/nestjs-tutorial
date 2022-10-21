import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    await getManager()
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(user);
      })
      .catch((err) => {
        throw err;
      });

    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`user id: ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.preload({ id: +id });
    if (!user) {
      throw new NotFoundException(`user id: ${id} not found`);
    }
    return this.userRepository.remove(user);
  }

  async listUser() {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`user id: ${id} not found`);
    }
    return user;
  }
}
