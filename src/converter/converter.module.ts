import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBalance } from '../users/users.entity';
import { BalanceModule } from '../balance/balance.module';
import { BalanceService } from '../balance/balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBalance]), BalanceModule],
  controllers: [ConverterController],
  providers: [ConverterService, BalanceService],
})
export class ConverterModule {}
