import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUsersResponse } from '../types/users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Pick<GetUsersResponse, 'email' | 'password'>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
