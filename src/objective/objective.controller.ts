import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveDto } from './dto/Objective.dto';

@Controller('objective')
export class ObjectiveController {
  constructor(
    @Inject(ObjectiveService) private objectiveService: ObjectiveService,
  ) {}

  @Post('/')
  async getObjective(@Body('idUser') idUser: string) {
    return await this.objectiveService.getObjective(idUser);
  }

  @Post('/add')
  async addObjective(@Body() objective: ObjectiveDto) {
    console.log(objective)
    return await this.objectiveService.addObjective(objective);
  }
}
