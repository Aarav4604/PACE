import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Pilot } from './pilot.entity';
import { Fill } from './fill.entity';

export enum TradeSide {
  BUY = 'buy',
  SELL = 'sell',
}

export enum TradeStatus {
  PENDING = 'pending',
  FILLED = 'filled',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('uuid')
  pilotId: string;

  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.PENDING,
  })
  status: TradeStatus;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Pilot, (pilot) => pilot.trades)
  @JoinColumn({ name: 'pilotId' })
  pilot: Pilot;

  @OneToMany(() => Fill, (fill) => fill.trade)
  fills: Fill[];
} 