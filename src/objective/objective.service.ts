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
  async addObjective(objective: ObjectiveDto): Promise<ObjectiveResponse> {
    await this.objectiveRepository.save(objective);

    return {
      isSuccess: true,
      code: 201,
      message: 'Objective is added to database',
    };
  }
}
