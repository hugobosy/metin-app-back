import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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

  @Get('/get-results/:id/:by')
  async getTransactionsByDate(
    @Param('id') id: string,
    @Param('by') by: 'day' | 'month' | 'year',
  ) {
    console.log(id, by);
    return await this.transactionService.getTransactionsByDate(id, by);
  }
}
