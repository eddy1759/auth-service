import { GetUser } from './get-user.decorator';

@Injectable()
export class AdminService {

  isSuperAdmin(@GetUser() user: User) {
    if (user.profile.role === 'SUPER_ADMIN') {
      return true;
    }
    return false;
  }
}