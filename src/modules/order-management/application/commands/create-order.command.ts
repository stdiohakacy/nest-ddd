import { BaseCommand } from 'src/cores/command.core';
import { Address } from '../../domain/value-objects/address.vo';
import { CreateOrderItemDTO } from '../dtos/create-order-item.dto';

export class CreateOrderCommand implements BaseCommand {
  public readonly timestamp: Date;
  public readonly commandName: string = 'CreateOrderCommand';

  constructor(
    public readonly customerId: string,
    public readonly shippingAddress: Address,
    public readonly items: CreateOrderItemDTO[],
  ) {
    this.timestamp = new Date();
  }
}
