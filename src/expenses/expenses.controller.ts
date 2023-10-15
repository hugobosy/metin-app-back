import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseResponse, GetExpensesResponse } from '../types/expenses';
import { AddExpenseDto } from './dto/AddExpenseDto';

@Controller('expenses')
export class ExpensesController {
  constructor(
    @Inject(ExpensesService) private expensesService: ExpensesService,
  ) {}

  @Post('/')
  async getExpenses(
    @Body('idUser') idUser: string,
  ): Promise<GetExpensesResponse[]> {
    return await this.expensesService.getExpenses(idUser);
  }

  @Post('add')
  async addExpense(@Body() expense: AddExpenseDto): Promise<ExpenseResponse> {
    return await this.expensesService.addExpense(expense);
  }
}
