import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { Repository } from 'typeorm';
import { AddExpenseDto } from './dto/AddExpenseDto';
import { ExpenseResponse } from '../types/expenses';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expenses)
    private ExpensesRepository: Repository<Expenses>,
  ) {}
  async getExpenses(idUser: string) {
    return await this.ExpensesRepository.findBy({ idUser });
  }

  async addExpense(expense: AddExpenseDto): Promise<ExpenseResponse> {
    await this.ExpensesRepository.save(expense);
    return {
      isSuccess: true,
      code: 201,
      message: 'Add expense to database is successfully',
    };
  }
}
