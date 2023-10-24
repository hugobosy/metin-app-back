import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
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

  @Get('/:id')
  async getOneObjective(@Param('id') id: string) {
    return await this.objectiveService.getOneObjective(id);
  }

  @Post('/add')
  async addObjective(@Body() objective: ObjectiveDto) {
    return await this.objectiveService.addObjective(objective);
  }

  @Patch('/complete/:id')
  async setCompleteObjective(@Param('id') id: string) {
    return await this.objectiveService.setCompleteObjective(id)
  }

  @Put('/edit')
  async editObjective(@Body() objective: ObjectiveDto) {
    console.log(objective.id)
    return await this.objectiveService.editObjective(objective.id, objective)
  }

  @Delete('/delete/:id')
  async deleteObjective(@Param('id') id: string) {
    return await this.objectiveService.deleteObjective(id)
  }
}
