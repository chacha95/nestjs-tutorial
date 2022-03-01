import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`user id: ${userId} not found`);
    }
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id: +userId,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`user id: ${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.getUserById(userId);
    return this.userRepository.remove(user);
  }
}
