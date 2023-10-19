import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveDto } from './dto/Objective.dto';

@Controller('objective')
export class ObjectiveController {
  constructor(
    @Inject(ObjectiveService) private objectiveService: ObjectiveService,
  ) {}

  @Post('/')
  async getObjective(@Body('token') token: string) {
    return await this.objectiveService.getObjective(token);
  }

  @Post('/add')
  async addObjective(@Body() objective: ObjectiveDto) {
    return await this.objectiveService.addObjective(objective);
  }
}
