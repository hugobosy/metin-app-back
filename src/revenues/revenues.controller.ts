import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { GetExpensesResponse } from '../types/expenses';
import { RevenuesResponse } from '../types/revenues';
import { AddRevenueDto } from './dto/AddRevenue.dto';

@Controller('revenues')
export class RevenuesController {
  constructor(
    @Inject(RevenuesService) private revenuesService: RevenuesService,
  ) {}

  @Post('/')
  async getRevenues(
    @Body('idUser') idUser: string,
  ): Promise<GetExpensesResponse[]> {
    return await this.revenuesService.getRevenues(idUser);
  }

  @Post('/add')
  async addRevenues(@Body() revenue: AddRevenueDto): Promise<RevenuesResponse> {
    return await this.revenuesService.addRevenue(revenue);
  }
}
