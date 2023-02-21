import { EntityRepository, Repository } from 'typeorm';

import { PostEntity } from '../db';
import { ICreatePostRequest, IUpdatePostRequest } from './interfaces';

@EntityRepository(PostEntity)
export class PostsRepository extends Repository<PostEntity> {
  async createAndSave(
    createPostRequest: ICreatePostRequest,
  ): Promise<PostEntity> {
    const post = this.create(createPostRequest);
    return await this.save(post);
  }

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

  async deleteById(user_id: string, id: string): Promise<void> {
    const post = await this.findOneOrFail({
      where: { user_id: user_id, id: id },
    });
    await this.remove(post);
  }

  async findById(user_id: string, id: string): Promise<PostEntity> {
    const post = await this.findOneOrFail({
      where: { user_id: user_id, id: id },
    });
    return post;
  }

  async paginate(user_id: string): Promise<PostEntity[]> {
    const posts = await this.find({
      where: { user_id: user_id },
    });
    return posts;
  }
}
