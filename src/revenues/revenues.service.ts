import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';
import { Repository } from 'typeorm';
import { AddRevenueDto } from './dto/AddRevenue.dto';
import { RevenuesResponse } from '../types/revenues';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectRepository(Revenues)
    private RevenuesRepository: Repository<Revenues>,
  ) {}
  async getRevenues(idUser: string) {
    console.log(idUser);
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
