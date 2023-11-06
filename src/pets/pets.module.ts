import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets, UsersPets } from './pets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pets, UsersPets])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
