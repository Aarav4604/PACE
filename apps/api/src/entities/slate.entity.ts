import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('slates')
export class Slate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  userId: string;

  @Column('jsonb')
  positions: Array<{
    symbol: string;
    weight: number;
  }>;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  totalValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.slates)
  @JoinColumn({ name: 'userId' })
  user: User;
} 