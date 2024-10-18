import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InboxService } from '../inbox/inbox.service';
import { Inbox } from '../inbox/entites/inbox.entity';
import { EntityManager } from 'typeorm';
import { Workflow } from './entities/workflow.entity';

export class WorkflowInboxProcessor {
  private readonly logger = new Logger(WorkflowInboxProcessor.name);
  constructor(private readonly inboxService: InboxService) {}
  @Cron(CronExpression.EVERY_10_SECONDS)
  async processInboxMessages() {
    this.logger.debug('processing inbox messages...');
    await this.inboxService.processInboxMessages(
      async (messages, manager) => {
        return Promise.all(messages.map((message) =>{
            if(message.pattern === 'workflows.create') {
              return this.createWorkflow(message, manager)
        }))
      },
      {
        take: 100,
      },
    );
  }

  async createWorkflow(message: Inbox, manager: EntityManager){
    const workflowsRepository = manager.getRepository(Workflow);

    const workflow = workflowsRepository.create({
        ...message.payload
    })

    const newWorkflowEntity = await workflowsRepository.save(workflow);
    this.logger.debug(`created workflow with id ${newWorkflowEntity.id} for building ${message.payload.buildingId}`)
    
    await manager.update(Inbox, message.id, {
      status: 'processed'
    })
  }
}
