import { Module, OnModuleInit } from '@nestjs/common';
import { CommandDispatcher } from 'src/cores/command.core';
import { CreateOrderHandler } from './application/commands/create-order.handler';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { OrderService } from './application/services/order.service';
import { OrderController } from './application/controllers/order-management.controller';
import { OrderTypeORMRepository } from './infrastructure/persistence/order.typeorm.repository';
import { DomainEventPublisher } from './infrastructure/messaging/domain-event-publisher';
import { PaymentGateway } from './infrastructure/external-services/payment-gateway.ext-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infrastructure/orm/order.typeorm.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), HttpModule],
  providers: [
    CommandDispatcher,
    CreateOrderHandler,
    CreateOrderUseCase,
    OrderService,
    OrderTypeORMRepository,
    DomainEventPublisher,
    PaymentGateway,
  ],
  controllers: [OrderController],
})
export class OrderManagementModule implements OnModuleInit {
  constructor(
    private readonly commandDispatcher: CommandDispatcher,
    private readonly createOrderHandler: CreateOrderHandler,
  ) {}

  onModuleInit(): void {
    this.commandDispatcher.register(
      'CreateOrderCommand',
      this.createOrderHandler,
    );
  }
}
