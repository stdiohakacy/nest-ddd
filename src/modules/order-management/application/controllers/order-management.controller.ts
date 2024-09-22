import { Controller, Post, Body } from '@nestjs/common';
import { CommandDispatcher } from 'src/cores/command.core';
import { CreateOrderCommand } from '../commands/create-order.command';

@Controller('orders')
export class OrderController {
  constructor(private readonly commandDispatcher: CommandDispatcher) {}

  @Post('/')
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<void> {
    await this.commandDispatcher.dispatch({
      type: 'CreateOrderCommand',
      payload: createOrderCommand,
    });
  }
}
