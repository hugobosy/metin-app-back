import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBalance } from '../users/users.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UserBalance])],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceModule],
})
export class BalanceModule {}
