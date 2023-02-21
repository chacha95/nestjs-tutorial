import { Injectable } from '@nestjs/common';

import { PostEntity } from '../db';
import { ICreatePostRequest, IUpdatePostRequest } from './interfaces';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(createPostRequest: ICreatePostRequest): Promise<PostEntity> {
    return await this.postsRepository.createAndSave(createPostRequest);
  }

  async updatePost(updatePostRequest: IUpdatePostRequest): Promise<PostEntity> {
    return await this.postsRepository.updateById(updatePostRequest);
  }

  async deletePost(user_id: string, id: string): Promise<void> {
    return await this.postsRepository.deleteById(user_id, id);
  }

  async getPost(user_id: string, id: string): Promise<PostEntity> {
    return await this.postsRepository.findById(user_id, id);
  }

  async listPosts(user_id: string): Promise<PostEntity[]> {
    return await this.postsRepository.paginate(user_id);
  }
}
