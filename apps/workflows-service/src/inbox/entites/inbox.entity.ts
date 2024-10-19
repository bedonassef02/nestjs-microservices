import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  messageId: string;

  @Column()
  pattern: string;

  @Column({ enum: ['pending', 'processed'] })
  status: 'pending' | 'processed';

  @Column()
  payload: Record<string, any>;

  @Column()
  createdAt: Date;
}
