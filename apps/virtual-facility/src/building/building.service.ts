import { Inject, Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { DataSource, Repository } from 'typeorm';
import { WORKFLOWS_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateWorkflowDto } from '../../../workflows-service/src/workflows/dto/create-workflow.dto';
import { Outbox } from '../outbox/entities/outbox.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>,
    @Inject(WORKFLOWS_SERVICE) private readonly workflowsService: ClientProxy,
    private readonly dataSources: DataSource,
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    const queryRunner = this.dataSources.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const buildingsRepository = queryRunner.manager.getRepository(Building);
    const outboxRepository = queryRunner.manager.getRepository(Outbox);

    try {
      const building = this.buildingsRepository.create({
        ...createBuildingDto,
      });
      const newBuildingEntity = await this.buildingsRepository.save(building);

      await outboxRepository.save({
        type: 'workflows.create',
        payload: {
          name: 'My Workflow',
          buildingId: building.id,
        },
        target: WORKFLOWS_SERVICE.description,
      });

      await queryRunner.commitTransaction();

      return newBuildingEntity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all building`;
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }

  async createWorkflow(buildingId: number) {
    const newWorkflow = await lastValueFrom(
      this.workflowsService.send('workflows.create', {
        name: 'My Workflow',
        buildingId,
      } as CreateWorkflowDto),
    );
    console.log({ newWorkflow });
    return newWorkflow;
  }
}
