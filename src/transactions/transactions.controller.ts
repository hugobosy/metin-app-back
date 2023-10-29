import { Controller, Get, Inject, Param } from '@nestjs/common';
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
}
