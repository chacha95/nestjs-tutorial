import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
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
  async create(
    @Param('userId') userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  async findAll(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  async find(@Param('userId') userId: number, @Param('id') id: string) {
    return this.postsService.findOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @Param('userId') userId: number,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(userId, +id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('userId') userId: number, @Param('id') id: string) {
    return this.postsService.remove(userId, +id);
  }
}
