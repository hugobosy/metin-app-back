import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from './pets.entity';
import { Repository } from 'typeorm';
import { PetsDto } from './dto/Pets.dto';
import { PetsData } from '../utils/const/pets';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private petsRepository: Repository<Pets>,
  ) {
    this.seedPets(PetsData);
  }
  async getPets() {
    return await this.petsRepository.find();
  }

  private async seedPets(pets: PetsDto[]) {
    const isPets = await this.petsRepository.find();
    if (isPets.length !== 0) {
      return;
    }
    await this.petsRepository.save(pets);
  }
}
