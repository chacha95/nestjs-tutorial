import { EntityRepository, Repository } from 'typeorm';

import { dbExceptionDecorator, PostEntity } from '../db';
import { ICreatePostRequest, IUpdatePostRequest } from './interfaces';

@EntityRepository(PostEntity)
export class PostsRepository extends Repository<PostEntity> {
  @dbExceptionDecorator()
  async createAndSave(
    createPostRequest: ICreatePostRequest,
  ): Promise<PostEntity> {
    const post = this.create(createPostRequest);
    return await this.save(post);
  }

  @dbExceptionDecorator()
  async updateById(updatePostRequest: IUpdatePostRequest): Promise<PostEntity> {
    const { user_id, id, name } = updatePostRequest;
    const queryBuilder = this.createQueryBuilder()
      .update()
      .where('user_id = :user_id', {
        user_id: user_id,
      })
      .andWhere('id =: id', { id: id });

    const updateColumn: Record<string, string> = {};
    if (name) {
      updateColumn.name = name;
    }
    queryBuilder.set(updateColumn);
    await queryBuilder.execute();

    const post = await this.findOneOrFail({
      where: { user_id: user_id, id: id },
    });
    return post;
  }

  @dbExceptionDecorator()
  async deleteById(user_id: string, id: string): Promise<void> {
    const post = await this.findOneOrFail({
      where: { user_id: user_id, id: id },
    });
    await this.remove(post);
  }

  @dbExceptionDecorator()
  async findById(user_id: string, id: string): Promise<PostEntity> {
    const post = await this.findOneOrFail({
      where: { user_id: user_id, id: id },
    });
    return post;
  }

  @dbExceptionDecorator()
  async paginate(user_id: string): Promise<PostEntity[]> {
    const posts = await this.find({
      where: { user_id: user_id },
    });
    return posts;
  }
}
