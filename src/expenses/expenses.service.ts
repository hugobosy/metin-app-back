import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { Repository } from 'typeorm';
import { AddExpenseDto } from './dto/AddExpenseDto';
import { ExpenseResponse } from '../types/expenses';
import { UserBalance } from '../users/users.entity';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expenses)
    private ExpensesRepository: Repository<Expenses>,
    @InjectRepository(UserBalance) private userBalance: Repository<UserBalance>,
    @Inject(BalanceService) private balanceService: BalanceService,
  ) {}
  async getExpenses(idUser: string) {
    return await this.ExpensesRepository.findBy({ idUser });
  }

  async addExpense(expense: AddExpenseDto): Promise<ExpenseResponse> {
    const balance = await this.userBalance.findOneBy({
      userID: expense.idUser,
    });

    const subtractionWon =
      balance.balanceWon - expense.priceWon * expense.count;
    const subtractionYang =
      balance.balanceYang - expense.priceYang * expense.count;

    await this.balanceService.updateBalance({
      id: expense.idUser,
      balanceWon: subtractionWon,
      balanceYang: subtractionYang,
    });
    await this.ExpensesRepository.save(expense);
    return {
      isSuccess: true,
      code: 201,
      message: 'Add expense to database is successfully',
    };
  }
}
