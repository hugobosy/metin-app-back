import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserConfirmCode } from './users.entity';
import { UserResponse } from '../types/users';
import { AddUserDto } from './dto/AddUser.dto';
import { generateCode } from '../utils/generate-code';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    @InjectRepository(UserConfirmCode)
    private UserConfirmRepository: Repository<UserConfirmCode>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async getOneUser(id: string): Promise<User> {
    return await this.UserRepository.findOneByOrFail({ id });
  }

  async addUser(user: AddUserDto): Promise<UserResponse> {
    const email = user.email;
    const userEmail = await this.UserRepository.findOneBy({ email });
    if (userEmail?.email === user.email) {
      return { isSuccess: false, code: 502 };
    }
    await this.UserRepository.save(user);
    const code = generateCode();
    const confirm = {
      userID: user.id,
      code,
    };
    await this.UserConfirmRepository.save(confirm);
    return { isSuccess: true, code: 201 };
  }

  async updateUserEmail(id: string, email: string): Promise<UserResponse> {
    await this.UserRepository.update(id, { email });
    return { isSuccess: true };
  }

  async updatePasswordUser(
    id: string,
    password: string,
  ): Promise<UserResponse> {
    await this.UserRepository.update(id, { password });
    return { isSuccess: true };
  }

  async removeUser(id: string): Promise<UserResponse> {
    await this.UserRepository.delete(id);
    return {
      isSuccess: true,
    };
  }
}
