import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from '../inbox/entites/inbox.entity';
import { InboxModule } from '../inbox/inbox.module';
import { WorkflowInboxProcessor } from './workflow-inbox.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox]), InboxModule],
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowInboxProcessor],
})
export class WorkflowsModule {}
