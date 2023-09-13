import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./users.entity";
import {UserResponse} from "../types/users";
import {AddUserDto} from "./dto/AddUser.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>
    ) {
    }

    async getUsers(): Promise<User[]> {
        return await this.UserRepository.find();
    }

    async getOneUser(id: string): Promise<User> {
        return await this.UserRepository.findOneByOrFail({id})
    }


    async addUser(user: AddUserDto): Promise<UserResponse>{
        await this.UserRepository.save(user)
        return {isSuccess: true, code: 201}
    }

    async updateUserEmail(id: string, email: string): Promise<UserResponse> {
        await this.UserRepository.update(id, {email})
        return {isSuccess: true}
    }

    async updatePasswordUser(id: string, password: string): Promise<UserResponse> {
        await this.UserRepository.update(id, {password})
        return {isSuccess: true};
    }

    async removeUser(id: string): Promise<UserResponse> {
        await this.UserRepository.delete(id)
        return {
            isSuccess: true
        }
    }
}
