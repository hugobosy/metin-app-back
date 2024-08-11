import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { UserPetsDto } from './dto/Pets.dto';

@Controller('pets')
export class PetsController {
  constructor(@Inject(PetsService) private petsService: PetsService) {}

  @Get('/')
  async getPets() {
    return await this.petsService.getPets();
  }

  @Get('/get-user-pets/:id')
  async getUserPets(@Param('id') userId: string) {
    return await this.petsService.getUserPets(userId);
  }

  @Post('/add')
  async addUserPet(@Body() pet: UserPetsDto) {
    return await this.petsService.addUserPet(pet);
  }

  @Delete('/:id')
  async deleteUserPet(@Param('id') id: string) {
    return await this.petsService.deleteUserPet(id);
  }
}
