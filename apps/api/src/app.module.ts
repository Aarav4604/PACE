import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PilotsModule } from './pilots/pilots.module';
import { SlatesModule } from './slates/slates.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebSocketGateway } from './websocket/websocket.gateway';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 60, // 60 requests per minute
      },
    ]),
    
    // Database
    DatabaseModule,
    
    // Feature modules
    UsersModule,
    PilotsModule,
    SlatesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketGateway],
})
export class AppModule {} 