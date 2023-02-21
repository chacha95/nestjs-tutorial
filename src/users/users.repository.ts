import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../db';
import { ICreateUserRequest, IUpdateUserRequest } from './interfaces';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  // @dbExceptionHandler()
  async createAndSave(
    createUserRequest: ICreateUserRequest,
  ): Promise<UserEntity> {
    const user = this.create(createUserRequest);
    return await this.save(user);
  }

  async updateById(updateUserRequest: IUpdateUserRequest): Promise<UserEntity> {
    const { id, first_name, last_name } = updateUserRequest;
    const queryBuilder = this.createQueryBuilder()
      .update()
      .where('id = :id', { id: id });

    // partial update
    const updateColumn: Record<string, string> = {};
    if (first_name) {
      updateColumn.first_name = first_name;
    }
    if (last_name) {
      updateColumn.last_name = last_name;
    }
    queryBuilder.set(updateColumn);
    await queryBuilder.execute();

    const user = await this.findOneOrFail({
      where: { id: id },
    });
    return user;
  }

  async deleteById(id: string): Promise<void> {
    const user = await this.findOneOrFail({
      where: { id: id },
    });
    await this.remove(user);
  }

  // @dbExceptionHandler()
  async findById(id: string): Promise<UserEntity> {
    return await this.findOneOrFail({
      where: { id: id },
    });
  }

  async paginate(): Promise<UserEntity[]> {
    return await this.find();
  }
}
