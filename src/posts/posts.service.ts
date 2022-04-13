import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postRepository.create({
      user_id: userId,
      ...createPostDto,
    });
    return this.postRepository.save(post);
  }

  async findAll(userId: number): Promise<PostEntity[]> {
    return this.postRepository.find({
      user_id: userId,
    });
  }

  async findOne(userId: number, id: number): Promise<PostEntity> {
    return this.postRepository.findOne({
      user_id: userId,
      id: id,
    });
  }

  async update(
    userId: number,
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postRepository.preload({
      user_id: userId,
      id: id,
      ...updatePostDto,
    });
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} not found`);
    }
    return this.postRepository.save(post);
  }

  async remove(userId: number, id: number): Promise<PostEntity> {
    const post = await this.postRepository.preload({
      user_id: userId,
      id: +id,
    });
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} not found`);
    }
    return this.postRepository.remove(post);
  }
}
