import { Injectable } from '@nestjs/common';

import { UserEntity } from '../db/user.entity';
import { ICreateUserRequest, IUpdateUserRequest } from './interfaces';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserRequest: ICreateUserRequest): Promise<UserEntity> {
    return await this.userRepository.createAndSave(createUserRequest);
  }

  async updateUser(updateUserRequest: IUpdateUserRequest): Promise<UserEntity> {
    return await this.userRepository.updateById(updateUserRequest);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.userRepository.deleteById(id);
  }

  async getUser(id: string): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  async listUser(): Promise<UserEntity[]> {
    return await this.userRepository.paginate();
  }
}
