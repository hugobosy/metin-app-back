import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Revenues } from '../revenues/revenues.entity';
import { Expenses } from '../expenses/expenses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Revenues, Expenses])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
