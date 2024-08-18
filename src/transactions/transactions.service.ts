import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { User } from '../users/users.entity';
import { Revenues } from '../revenues/revenues.entity';
import { Expenses } from '../expenses/expenses.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Revenues)
    private revenueRepository: Repository<Revenues>,
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
  ) {}
  async getTransactions(userId: string) {
    const transactions = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.revenues', 'revenues')
      .leftJoinAndSelect('user.expenses', 'expenses')
      .where('user.id = :userId', { userId })
      .getOne();

    return transactions.revenues
      .concat(transactions.expenses)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTransactionsByDate(
    userId: string,
    createdAt: string & number,
    by: 'day' | 'month' | 'year',
  ) {
    switch (by) {
      case 'day':
        return await this.getTransactionByDay(userId, createdAt);
      case 'month':
        return await this.getTransactionByMonth(userId, createdAt);
      case 'year':
        return await this.getTransactionByYear(userId, createdAt);
    }
  }

  private async getTransactionByDay(
    userId: string,
    createdAt: string | number,
  ) {
    const day = new Date(createdAt).toLocaleDateString();
    const transactions = await this.getTransactions(userId);

    return transactions
      .map((item) => item)
      .filter((date) => new Date(date.createdAt).toLocaleDateString() === day);
  }
  private async getTransactionByMonth(userId: string, month: number) {
    const transactions = await this.getTransactions(userId);

    return transactions
      .map((item) => item)
      .filter(
        (date) =>
          `${new Date(date.createdAt).getUTCMonth()}` ===
          `${new Date(month).getMonth()}`,
      );
  }
  private async getTransactionByYear(userId: string, year: number) {
    const transactions = await this.getTransactions(userId);

    return transactions
      .map((item) => item)
      .filter(
        (date) =>
          `${new Date(date.createdAt).getFullYear()}` ===
          `${new Date(year).getFullYear()}`,
      );
  }
}
