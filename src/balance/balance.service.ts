import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBalance } from '../users/users.entity';
import { Repository } from 'typeorm';
import { BalanceDto } from './dto/balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(UserBalance)
    private balanceRepository: Repository<UserBalance>,
  ) {}
  async updateBalance(balance: BalanceDto) {
    try {
      if (!(await this.balanceRepository.findOneBy({ userID: balance.id }))) {
        return {
          isSuccess: false,
          code: 502,
          message: 'Cannot find user',
        };
      }

      await this.balanceRepository.update(
        { userID: balance.id },
        {
          balanceWon: balance.balanceWon,
          balanceYang: balance.balanceYang,
        },
      );

      return {
        isSuccess: true,
        code: 201,
        message: 'Balance id updated',
      };
    } catch (e) {
      return {
        isSuccess: false,
        code: 501,
        message: 'Cannot find user',
      };
    }
  }

  async getBalance(id: string) {
    const user = await this.balanceRepository.findOneBy({
      userID: id,
    });
    return { balanceYang: user?.balanceYang, balanceWon: user?.balanceWon };
  }
}
