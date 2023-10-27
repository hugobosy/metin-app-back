import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';
import { Repository } from 'typeorm';
import { AddRevenueDto } from './dto/AddRevenue.dto';
import { RevenuesResponse } from '../types/revenues';
import { User, UserBalance } from '../users/users.entity';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectRepository(Revenues)
    private RevenuesRepository: Repository<Revenues>,
    @InjectRepository(UserBalance) private userBalance: Repository<UserBalance>,
    @Inject(BalanceService) private balanceService: BalanceService,
  ) {}
  async getRevenues(idUser: string) {
    return await this.RevenuesRepository.findBy({ idUser });
  }

  async addRevenue(revenue: AddRevenueDto): Promise<RevenuesResponse> {
    const balance = await this.userBalance.findOneBy({
      userID: revenue.idUser,
    });

    const sumWon = balance.balanceWon + revenue.priceWon * revenue.count;
    const sumYang = balance.balanceYang + revenue.priceYang * revenue.count;

    await this.balanceService.updateBalance({
      id: revenue.idUser,
      balanceWon: sumWon,
      balanceYang: sumYang,
    });
    await this.RevenuesRepository.save(revenue);
    return {
      isSuccess: true,
      code: 201,
      message: 'Revenues is adding to database',
    };
  }
}
