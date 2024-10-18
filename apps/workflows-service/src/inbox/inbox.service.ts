import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Inbox } from './entites/inbox.entity';

@Injectable()
export class InboxService {
  constructor(private readonly dataSource: DataSource) {}

  async processInboxMessages(
    process: (message: Inbox[], manager: EntityManager) => Promise<unknown>,
    options: { take: number },
  ) {
    return this.dataSource.transaction(async (manager) => {
      const inputRepository = manager.getRepository(Inbox);
      const messages = await inputRepository.find({
        where: { status: 'pending' },
        order: { createdAt: 'ASC' },
        take: options.take,
      });
      await process(messages, manager);
    });
  }
}
