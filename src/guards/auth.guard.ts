import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    /*  console.log(token); */

    try {
      const data = this.authService.checkToken(
        String((token ?? '').replace('Bearer ', '')),
      );
      request.tokenPayload = data;
      request.user = await this.userService.readOne(Number(data.id));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
