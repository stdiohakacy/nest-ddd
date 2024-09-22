import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderManagementModule } from './modules/order-management/order-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ddd_db',
      entities: [], // Ensure your entity is included here
      // synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    OrderManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
