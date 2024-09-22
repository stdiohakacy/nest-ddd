import { Injectable } from '@nestjs/common';
import { CommandHandler } from 'src/cores/command.core';
import { CreateOrderCommand } from './create-order.command';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';

@Injectable()
export class CreateOrderHandler implements CommandHandler<CreateOrderCommand> {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async handle(command: CreateOrderCommand): Promise<void> {
    // Sử dụng UseCase để thực thi logic nghiệp vụ
    await this.createOrderUseCase.execute(command);
  }
}
