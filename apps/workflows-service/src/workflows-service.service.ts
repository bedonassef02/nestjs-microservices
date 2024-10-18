import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './workflows/dto/create-workflow.dto';

@Injectable()
export class WorkflowsServiceService {
  create(workflowDto: CreateWorkflowDto): string {
    return 'Hello World!';
  }
}
