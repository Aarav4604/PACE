import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trade, TradeSide } from './trade.entity';

@Entity('fills')
export class Fill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  tradeId: string;

  @Column()
  symbol: string;

  @Column({
    type: 'enum',
    enum: TradeSide,
  })
  side: TradeSide;

  @Column('decimal', { precision: 15, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  slippage: number; // percentage

  @Column('int')
  latency: number; // milliseconds

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Trade, (trade) => trade.fills)
  @JoinColumn({ name: 'tradeId' })
  trade: Trade;
} 