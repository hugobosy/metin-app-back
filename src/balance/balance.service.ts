import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { BalanceDto } from './dto/balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async updateBalance(balance: BalanceDto) {
    await this.userRepository.update(balance.id, {
      balanceWon: balance.balanceWon,
      balanceYang: balance.balanceYang,
    });

    return {
      isSuccess: true,
      code: 201,
      message: 'Balance is updated',
    };
  }

  async getBalance(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    const { balanceYang, balanceWon } = user;
    return { balanceYang: balanceYang, balanceWon: balanceWon };
  }
}
