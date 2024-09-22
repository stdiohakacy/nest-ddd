import { Address } from '../../domain/value-objects/address.vo';
import { CreateOrderItemDTO } from './create-order-item.dto';

export class CreateOrderDTO {
  id: string;
  customerId: string;
  shippingAddress: Address;
  items: CreateOrderItemDTO[];
}
