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

  async getTransactionsByDate(userId: string, by: 'day' | 'month' | 'year') {
    const transactions = await this.getTransactions(userId);

    const resultsYang = {};
    const resultsWon = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt);

      let key;
      switch (by) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'month':
          key =
            date.getFullYear() +
            '-' +
            String(date.getMonth() + 1).padStart(2, '0');
          break;
        case 'year':
          key = date.getFullYear();
          break;
        default:
          throw new Error(`Unknown by: ${by}`);
      }

      if (!resultsYang[key]) {
        resultsYang[key] = 0;
      }
      if (!resultsWon[key]) {
        resultsWon[key] = 0;
      }

      resultsYang[key] += transaction.priceYang;
      resultsWon[key] += transaction.priceWon;
    });

    return [resultsWon, resultsYang];
  }
}
