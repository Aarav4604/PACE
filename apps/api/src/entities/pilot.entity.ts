import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trade } from './trade.entity';

@Entity('pilots')
export class Pilot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalReturn: number; // 30-day return percentage

  @Column({ default: 0 })
  followers: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Trade, (trade) => trade.pilot)
  trades: Trade[];
} 