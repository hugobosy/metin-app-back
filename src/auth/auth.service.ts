import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    console.log(email);
    try {
      const user = await this.usersService.findOne(email);
      const payload = {
        id: user?.id,
        email: user?.email,
        username: user?.nick,
        isActive: user?.isActive,
      };

      if (user?.password !== pass) {
        throw new UnauthorizedException({ code: 401 });
      }

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new UnauthorizedException({ code: 401 });
    }
  }
}
