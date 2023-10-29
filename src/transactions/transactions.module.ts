import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { RevenuesModule } from '../revenues/revenues.module';
import { ExpensesModule } from '../expenses/expenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenues } from '../revenues/revenues.entity';
import { Expenses } from '../expenses/expenses.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [
    RevenuesModule,
    ExpensesModule,
    TypeOrmModule.forFeature([Revenues, Expenses, User]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
