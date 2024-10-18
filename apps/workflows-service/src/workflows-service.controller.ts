import { Controller, Get } from '@nestjs/common';
import { WorkflowsServiceService } from './workflows-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateWorkflowDto } from './workflows/dto/create-workflow.dto';

@Controller()
export class WorkflowsServiceController {
  constructor(
    private readonly workflowsServiceService: WorkflowsServiceService,
  ) {}

  @MessagePattern('workflows.create')
  create(@Payload() workflowDto: CreateWorkflowDto): string {
    return this.workflowsServiceService.create(workflowDto);
  }
}
