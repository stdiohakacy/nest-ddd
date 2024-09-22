import { Money } from '../../domain/value-objects/money.vo';

export class AddItemDTO {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: Money;
}
