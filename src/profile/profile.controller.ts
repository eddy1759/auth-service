import { GetUser } from './get-user.decorator';

@Controller('profile')
export class ProfileController {
  
  @Get(':id')
  getUserProfile(@Param('id') userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, lastLogin: true }
    });
  }
}