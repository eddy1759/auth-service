import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetUser } from './get-user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  getMessageThread(@Param('id') messageId: string, @GetUser() user: any) {
    return this.prisma.message.findUnique({
      where: { id: messageId },
      include: { sender: true, receiver: true },
    });
  }
}
