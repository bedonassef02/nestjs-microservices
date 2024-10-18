import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outbox } from './entities/outbox.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(Outbox)
    private readonly outboxRepository: Repository<Outbox>,
  ) {}

  async getUnprocessedMessages(options:{ target:string, take: number}):Promise<Outbox[]>{
    return this.outboxRepository.find({
      where:{
        target: options.target
      },
      take: options.take,
      order:{
        createdAt: 'ASC'
      }
    })
  }
}
