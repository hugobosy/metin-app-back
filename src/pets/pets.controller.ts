import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { UserPetsDto } from './dto/Pets.dto';

@Controller('pets')
export class PetsController {
  constructor(@Inject(PetsService) private petsService: PetsService) {}

  @Get('/')
  async getPets() {
    return await this.petsService.getPets();
  }

  @Get('/:id')
  async getUserPets(@Param('id') userId: string) {
    console.log(userId);
    return await this.petsService.getUserPets(userId);
  }

  @Post('/add')
  async addUserPet(@Body('pet') pet: UserPetsDto) {
    console.log(pet);
    return await this.petsService.addUserPets(pet);
  }
}
