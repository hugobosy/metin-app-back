import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceDto } from './dto/balance.dto';

@Controller('balance')
export class BalanceController {
  constructor(@Inject(BalanceService) private balanceService: BalanceService) {}

  @Get('/:id')
  async getBalance(@Param('id') id: string) {
    return this.balanceService.getBalance(id);
  }

  @Put('/')
  async updateBalance(@Body('balance') balance: BalanceDto) {
    console.log(balance);
    return this.balanceService.updateBalance(balance);
  }
}
