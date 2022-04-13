import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // private connection: Connection,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // queryRunner 방식
  // async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   const queryRunner = this.connection.createQueryRunner();

  //   const userEntity = this.userRepository.create(createUserDto);

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const result = await queryRunner.manager.save(userEntity);

  //     await queryRunner.commitTransaction();
  //     return result;
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //     throw new NotFoundException(`Failed: ${err}`);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // 객체 생성(Entity Manager) 방식
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

  async getUsers() {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`user id: ${userId} not found`);
    }
    return user;
  }

  async updateByUserId(
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

  async deleteByUserId(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.preload({ id: +userId });
    if (!user) {
      throw new NotFoundException(`user id: ${userId} not found`);
    }
    return this.userRepository.remove(user);
  }

  // async deleteByUserId(userId: number) {
  //   const queryRunner = this.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const user = await this.getUserById(userId);
  //     const result = await this.userRepository.remove(user);

  //     await queryRunner.commitTransaction();

  //     return result;
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //     throw new NotFoundException(`Failed: ${err}`);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
