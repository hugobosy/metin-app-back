import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Objective } from './objective.entity';
import { Repository } from 'typeorm';
import { ObjectiveDto } from './dto/Objective.dto';
import { ObjectiveResponse } from '../types/objective';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(Objective)
    private objectiveRepository: Repository<Objective>,
  ) {}

  async getObjective(idUser: string) {
    return this.objectiveRepository.findBy({ idUser });
  }

  async getOneObjective(id: string) {
    console.log(id)
    return this.objectiveRepository.findOneBy({ id })
  }
  
  async addObjective(objective: ObjectiveDto): Promise<ObjectiveResponse> {
    await this.objectiveRepository.save(objective);

    return {
      isSuccess: true,
      code: 201,
      message: 'Objective is added to database',
    };
  }

  async setCompleteObjective(id: string): Promise<ObjectiveResponse> {
    await this.objectiveRepository.delete(id)

    return {
      isSuccess: true,
      code: 201,
      message: 'Objective is updated'
    }
  }

  async editObjective(id: string, objective: ObjectiveDto): Promise<ObjectiveResponse> {
    console.log(id, objective)
    await this.objectiveRepository.update(objective.id, objective.values)

    return {
      isSuccess: true,
      code: 201,
      message: 'Objective is updated'
    }
  }

  async deleteObjective(id:string) {
    await this.objectiveRepository.delete(id)

    return {
      isSuccess: true,
      code: 201,
      message: 'Objective is deleted'
    }
  }
}
