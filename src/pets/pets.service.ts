import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets, UsersPets } from './pets.entity';
import { Repository } from 'typeorm';
import { PetsDto, UserPetsDto } from './dto/Pets.dto';
import { PetsData } from '../utils/const/pets';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private petsRepository: Repository<Pets>,
    @InjectRepository(UsersPets)
    private usersPetsRepository: Repository<UsersPets>,
  ) {
    this.seedPets(PetsData);
  }
  async getPets() {
    return await this.petsRepository.find();
  }

  async getUserPets(id: string) {
    return await this.usersPetsRepository.findBy({ userId: id });
  }

  async addUserPets(pet: UserPetsDto) {
    await this.usersPetsRepository.save(pet);

    return {
      isSuccess: true,
      code: 201,
      message: `add pet: ${pet}`,
    };
  }

  private async seedPets(pets: PetsDto[]) {
    const isPets = await this.petsRepository.find();
    if (isPets.length !== 0) {
      return;
    }
    await this.petsRepository.save(pets);
  }
}
