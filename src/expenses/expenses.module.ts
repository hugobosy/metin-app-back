import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { BalanceModule } from '../balance/balance.module';
import { UserBalance } from '../users/users.entity';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expenses, UserBalance]), BalanceModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, BalanceService],
})
export class ExpensesModule {}
