import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Call the parent class constructor
  }

  async validate(username: string, password: string): Promise<any> {
    const user: User = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({
        message: ['Invalid username or password'],
      });
    }

    return user;
  }
}
