import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserBalance } from '../users/users.entity';
import { Repository } from 'typeorm';
import { BalanceDto } from './dto/balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(UserBalance)
    private balanceRepository: Repository<UserBalance>,
  ) {}
  async updateBalance(balance: BalanceDto) {
    await this.balanceRepository.update(balance.id, {
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
    const { balanceWon, balanceYang } = await this.balanceRepository.findOneBy({
      userID: id,
    });
    return { balanceYang: balanceYang, balanceWon: balanceWon };
  }
}
