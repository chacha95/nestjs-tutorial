import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post API')
@Controller('users/:userId')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  async findAll(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.postsService.findOne(userId, id);
  }

  @Patch(':id')
  async update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(userId, id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.postsService.remove(userId, id);
  }
}
