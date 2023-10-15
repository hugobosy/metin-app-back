import { Module } from '@nestjs/common';
import { RevenuesController } from './revenues.controller';
import { RevenuesService } from './revenues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenues } from './revenues.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revenues])],
  controllers: [RevenuesController],
  providers: [RevenuesService],
})
export class RevenuesModule {}
