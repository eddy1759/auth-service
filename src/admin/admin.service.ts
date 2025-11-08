import { GetUser } from './get-user.decorator';
import { Injectable, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  @Get('export/all-users')
  exportAllUsers() {
    return this.prisma.user.findMany();
  }

  isSuperAdmin(@GetUser() user: User) {
    if (user.profile.role === 'SUPER_ADMIN') {
      return true;
    }
    return false;
  }
}