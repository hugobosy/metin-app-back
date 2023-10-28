import { Inject, Injectable } from '@nestjs/common';
import { ConvertValues } from '../types/converter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBalance } from '../users/users.entity';
import { Repository } from 'typeorm';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class ConverterService {
  constructor(
    @InjectRepository(UserBalance)
    private balanceRepository: Repository<UserBalance>,
    @Inject(BalanceService) private balanceService: BalanceService,
  ) {}
  async convertWonToYang(values: ConvertValues) {
    await this.calculateWonToYang(values.won, values.id);
    return {
      isSuccess: true,
      code: 201,
      message: 'convert is success',
    };
  }

  async convertYangToWon(values: ConvertValues) {
    await this.calculateYangToWon(values.won, values.id);
    return {
      isSuccess: true,
      code: 201,
      message: 'convert is success',
    };
  }

  private async calculateWonToYang(won: number, id: string) {
    const user = await this.balanceRepository.findOneBy({ userID: id });
    const { balanceYang, balanceWon } = user;

    await this.balanceRepository.update(
      { userID: id },
      {
        balanceWon: balanceWon - won,
        balanceYang: balanceYang + won * 100000000,
      },
    );
  }
  private async calculateYangToWon(won: number, id: string) {
    const user = await this.balanceRepository.findOneBy({ userID: id });
    const { balanceYang, balanceWon } = user;

    await this.balanceRepository.update(
      { userID: id },
      {
        balanceWon: balanceWon + won,
        balanceYang: balanceYang - won * 103000000,
      },
    );
  }
}
