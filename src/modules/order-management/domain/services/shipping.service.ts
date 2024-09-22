import { OrderAggregate } from '../aggregates/order.aggregate';
import { Address } from '../value-objects/address.vo';
import { Money } from '../value-objects/money.vo';

export class ShippingService {
  calculateShippingCost(
    order: OrderAggregate,
    shippingAddress: Address,
  ): Money {
    // Giả lập tính phí vận chuyển
    const baseRate = 10;
    const distanceFactor = this.calculateDistance(shippingAddress);
    return new Money(baseRate * distanceFactor, 'USD');
  }

  private calculateDistance(address: Address): number {
    // Giả lập tính toán khoảng cách dựa trên địa chỉ
    return Math.random() * 10;
  }
}
