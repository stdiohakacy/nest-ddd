import { Money } from '../../domain/value-objects/money.vo';

export class CreateOrderItemDTO {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: Money;
}
