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

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('post API')
@Controller('users/:userId')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'post 생성', description: '' })
  async createPost(
    @Param('userId') userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @Patch(':id')
  async updatePost(
    @Param('userId') userId: number,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(userId, +id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('userId') userId: number, @Param('id') id: string) {
    return this.postsService.deletePost(userId, +id);
  }

  @Get()
  async listPosts(@Param('userId') userId: number) {
    return this.postsService.listPosts(userId);
  }

  @Get(':id')
  async getPost(@Param('userId') userId: number, @Param('id') id: string) {
    return this.postsService.getPost(userId, +id);
  }
}
