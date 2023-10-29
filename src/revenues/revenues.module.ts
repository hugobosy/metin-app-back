import { Module } from '@nestjs/common';
import { RevenuesController } from './revenues.controller';
import { RevenuesService } from './revenues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';
import { UserBalance } from '../users/users.entity';
import { BalanceModule } from '../balance/balance.module';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revenues, UserBalance]), BalanceModule],
  controllers: [RevenuesController],
  providers: [RevenuesService, BalanceService],
  exports: [RevenuesModule],
})
export class RevenuesModule {}
