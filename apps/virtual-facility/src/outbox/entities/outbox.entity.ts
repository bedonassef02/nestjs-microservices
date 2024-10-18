import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Outbox{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string
    @Column({type:'json'})
    paylod: Record<string, any>;
    @Column()
    target: string;
    @Column()
    createdAt: Date;
}