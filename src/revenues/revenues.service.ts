import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';
import { Repository } from 'typeorm';
import { AddRevenueDto } from './dto/AddRevenue.dto';
import { RevenuesResponse } from '../types/revenues';
import { User } from '../users/users.entity';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectRepository(Revenues)
    private RevenuesRepository: Repository<Revenues>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getRevenues(idUser: string) {
    return await this.RevenuesRepository.findBy({ idUser });
  }

  async addRevenue(revenue: AddRevenueDto): Promise<RevenuesResponse> {
    await this.RevenuesRepository.save(revenue);
    return {
      isSuccess: true,
      code: 201,
      message: 'Revenues is adding to database',
    };
  }
}
