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

  async getUserPets(userId: string) {
    return await this.usersPetsRepository
      .createQueryBuilder('usersPets')
      .leftJoinAndSelect('usersPets.pets', 'pets')
      .where('usersPets.userId = :userId', { userId })
      .getMany();
  }

  async addUserPet(pet: UserPetsDto) {
    try {
      await this.usersPetsRepository.save(pet);

      return {
        isSuccess: true,
        code: 201,
        message: `add pet: ${pet.name}`,
      };
    } catch (error) {
      return {
        isSuccess: false,
        code: 500,
        message: error.message,
      };
    }
  }

  async deleteUserPet(id: string) {
    try {
      const isPet = await this.usersPetsRepository.findOneBy({ id });
      if (isPet) {
        await this.usersPetsRepository.delete(id);
        return {
          isSuccess: true,
          code: 200,
          message: `deleted pet: ${id}`,
        };
      }

      return {
        isSuccess: false,
        code: 400,
        message: `not found pet: ${id}`,
      };
    } catch (error) {
      return {
        isSuccess: false,
        code: 500,
        message: error.message,
      };
    }
  }

  private async seedPets(pets: PetsDto[]) {
    const isPets = await this.petsRepository.find();
    if (isPets.length !== 0) {
      return;
    }
    await this.petsRepository.save(pets);
  }
}
