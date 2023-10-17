import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveDto } from './dto/Objective.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('objective')
export class ObjectiveController {
  constructor(
    @Inject(ObjectiveService) private objectiveService: ObjectiveService,
  ) {}

  @Post('/')
  async getObjective(@Body('userId') idUser: string) {
    return await this.objectiveService.getObjective(idUser);
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  async addObjective(@Body() objective: ObjectiveDto) {
    return await this.objectiveService.addObjective(objective);
  }
}
