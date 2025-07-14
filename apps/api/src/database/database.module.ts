import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Pilot } from '../entities/pilot.entity';
import { Slate } from '../entities/slate.entity';
import { Trade } from '../entities/trade.entity';
import { Fill } from '../entities/fill.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'pace_user'),
        password: configService.get('DB_PASSWORD', 'pace_password'),
        database: configService.get('DB_NAME', 'pace_db'),
        entities: [User, Pilot, Slate, Trade, Fill],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {} 