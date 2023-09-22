import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersResponse, UserResponse } from '../types/users';
import { AddUserDto } from './dto/AddUser.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @Get('/')
  async getUsers(): Promise<GetUsersResponse[]> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string): Promise<GetUsersResponse> {
    return await this.userService.getOneUser(id);
  }

  @Post('/add')
  async addUser(@Body() user: AddUserDto): Promise<UserResponse> {
    return await this.userService.addUser(user);
  }

  @Post('/update-email/:id')
  async updateUserEmail(
    @Param('id') id: string,
    @Body('email') email: string,
  ): Promise<UserResponse> {
    return await this.userService.updateUserEmail(id, email);
  }

  @Post('/update-password/:id')
  async updatePasswordUser(
    @Param('id') id: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.userService.updatePasswordUser(id, password);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<UserResponse> {
    return await this.userService.removeUser(id);
  }
}
