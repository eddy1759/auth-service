import { GetUser } from './get-user.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('posts')
export class PostsController {
constructor(private readonly prisma: PrismaService) {}

  @Get('user/:userId')
  async getPostsForUser(@Param('userId') userId: string) {

    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
    });

    const detailedPosts = [];
    for (const post of posts) {
      const comments = await this.prisma.comment.findMany({
        where: { postId: post.id }
      });
      detailedPosts.push({ ...post, comments });
    }

    return detailedPosts;
  }
}