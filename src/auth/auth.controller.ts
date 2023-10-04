import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() user: Record<string, any>) {
    return await this.authService.signIn(user.email, user.password);
  }

  @Get('signout')
  async signOut() {
    return await this.authService.signOut();
  }
}
