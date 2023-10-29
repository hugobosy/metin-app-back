import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getTransactions(userId: string) {
    const transactions = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.revenues', 'revenues')
      .leftJoinAndSelect('user.expenses', 'expenses')
      .where('user.id = :userId', { userId })
      .getOne();

    return {
      transactions: transactions.revenues.concat(transactions.expenses),
    };
  }
}
