import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PULID } from 'src/common/pulid/pulid';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        id: PULID.generate('po'),
        userId: userId,
        title: createPostDto.title,
        content: createPostDto.content,
      },
    });
    return post;
  }

  async findAll(userId: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  }

  async findOne(userId: string, id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }

  async update(userId: string, id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: updatePostDto,
    });
    return post;
  }

  async remove(userId: string, id: string) {
    const post = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  }
}
