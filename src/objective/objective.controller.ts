import { Body, Controller, Delete, Inject, Param, Patch, Post } from '@nestjs/common';
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
    return await this.objectiveService.addObjective(objective);
  }

  @Patch('/complete/:id')
  async setCompleteObjective(@Param() id: string) {
    return await this.objectiveService.setCompleteObjective(id)
  }

  @Patch('/edit/:id')
  async editObjective(@Param() id: string, @Body() objective: ObjectiveDto) {
    return await this.objectiveService.editObjective(id, objective)
  }

  @Delete('/delete/:id')
  async deleteObjective(@Param() id: string) {
    return await this.objectiveService.deleteObjective(id)
  }
}
