import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseResponse, GetExpensesResponse } from '../types/expenses';
import { AddExpenseDto } from './dto/AddExpenseDto';

@Controller('expenses')
export class ExpensesController {
  constructor(
    @Inject(ExpensesService) private expensesService: ExpensesService,
  ) {}

  @Get('/')
  async getExpenses(id: string): Promise<GetExpensesResponse[]> {
    return await this.expensesService.getExpenses(id);
  }

  @Post('add')
  async addExpense(@Body() expense: AddExpenseDto): Promise<ExpenseResponse> {
    return await this.expensesService.addExpense(expense);
  }
}
