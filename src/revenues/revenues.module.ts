import { Module } from '@nestjs/common';
import { RevenuesController } from './revenues.controller';
import { RevenuesService } from './revenues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';
import { User } from '../users/users.entity';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [TypeOrmModule.forFeature([Revenues, User]), BalanceModule],
  controllers: [RevenuesController],
  providers: [RevenuesService],
})
export class RevenuesModule {}
