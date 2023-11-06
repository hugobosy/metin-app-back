import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(@Inject(PetsService) private petsService: PetsService) {}

  @Get('/')
  async getPets() {
    return await this.petsService.getPets();
  }
}
