import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePostDto, UpdatePostDto } from './dto';
import { ICreatePostRequest, IUpdatePostRequest } from './interfaces';
import { PostsService } from './posts.service';

@ApiTags('post API')
@Controller('users/:user_id')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'post 생성', description: '' })
  async createPost(
    @Param('user_id') user_id: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost({
      user_id: user_id,
      ...createPostDto,
    } as ICreatePostRequest);
  }

  @Patch(':id')
  async updatePost(
    @Param('user_id') user_id: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost({
      user_id: user_id,
      id: id,
      ...updatePostDto,
    } as IUpdatePostRequest);
  }

  @Delete(':id')
  async deletePost(@Param('user_id') user_id: string, @Param('id') id: string) {
    return this.postsService.deletePost(user_id, id);
  }

  @Get(':id')
  async getPost(@Param('user_id') user_id: string, @Param('id') id: string) {
    return this.postsService.getPost(user_id, id);
  }

  @Get()
  async listPosts(@Param('user_id') user_id: string) {
    return this.postsService.listPosts(user_id);
  }
}
