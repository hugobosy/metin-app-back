import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(TransactionsService)
    private transactionService: TransactionsService,
  ) {}

  @Get('/:id')
  async getTransactions(@Param('id') id: string) {
    return await this.transactionService.getTransactions(id);
  }

  @Get('/:id/:date')
  async getTransactionsByDate(
    @Param('id') id: string,
    @Param('date') date: string & number,
    @Body('by') by: 'day' | 'month' | 'year',
  ) {
    return await this.transactionService.getTransactionsByDate(id, date, by);
  }
}
