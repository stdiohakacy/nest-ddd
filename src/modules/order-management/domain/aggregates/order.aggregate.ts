import { BaseAggregateRoot } from 'src/cores/aggregate-root.core';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../../shared/constants';
import { Money } from '../value-objects/money.vo';
import { Address } from '../value-objects/address.vo';
import { OrderCompletedEvent } from '../events/order-completed.event';
import { CreateOrderDTO } from '../../application/dtos/create-order.dto';

// Order Aggregate Root
export class OrderAggregate extends BaseAggregateRoot<string> {
  private _version: number = 0;
  private _customerId: string;
  private _orderItems: OrderItem[] = [];
  private _status: OrderStatus;
  private _totalAmount: Money;
  private _shippingAddress: Address;

  constructor(id: string, customerId: string, shippingAddress: Address) {
    super(id);
    this._customerId = customerId;
    this._status = OrderStatus.PENDING;
    this._totalAmount = new Money(0, 'USD');
    this._shippingAddress = shippingAddress;
    this.validate();
  }

  public static createOrder(createOrderDto: CreateOrderDTO): OrderAggregate {
    const order = new OrderAggregate(
      createOrderDto.id,
      createOrderDto.customerId,
      createOrderDto.shippingAddress,
    );

    createOrderDto.items.forEach((itemDto) => {
      const orderItem = new OrderItem(
        itemDto.id,
        itemDto.productId,
        itemDto.quantity,
        itemDto.unitPrice,
      );
      order.addOrderItem(orderItem);
    });

    return order;
  }

  // Add Order Item
  public addOrderItem(orderItem: OrderItem): void {
    this._orderItems.push(orderItem);
    this.calculateTotalAmount();
    this.incrementVersion();
    this.addDomainEvent({ type: 'OrderItemAdded', data: orderItem });
  }

  // Remove Order Item
  public removeOrderItem(orderItemId: string): void {
    this._orderItems = this._orderItems.filter(
      (item) => item.id !== orderItemId,
    );
    this.calculateTotalAmount();
    this.incrementVersion();
    this.addDomainEvent({ type: 'OrderItemRemoved', data: orderItemId });
  }

  // Update Shipping Address
  public updateShippingAddress(newAddress: Address): void {
    this._shippingAddress = newAddress;
    this.addDomainEvent({ type: 'ShippingAddressUpdated', data: newAddress });
    this.incrementVersion();
  }

  // Mark order as completed
  public markAsCompleted(): void {
    if (this._status === OrderStatus.COMPLETED) {
      throw new Error('Order is already completed');
    }
    this._status = OrderStatus.COMPLETED;
    this.incrementVersion();
    this.addDomainEvent(new OrderCompletedEvent(this._id, this._customerId));
  }

  // Increment version of the aggregate
  private incrementVersion(): void {
    this._version++;
  }

  // Private helper to calculate total amount
  private calculateTotalAmount(): void {
    this._totalAmount = this._orderItems
      .map((item) => item.totalPrice)
      .reduce((sum, price) => sum.add(price), new Money(0, 'USD'));
  }

  // Getter for totalAmount
  public get totalAmount(): Money {
    return this._totalAmount;
  }

  // Getter for orderItems
  public get orderItems(): OrderItem[] {
    return this._orderItems;
  }

  // Getter for status
  public get status(): OrderStatus {
    return this._status;
  }

  // Getter for shipping address
  public get shippingAddress(): Address {
    return this._shippingAddress;
  }

  // Getter for customerId
  public get customerId(): string {
    return this._customerId;
  }

  // Validate the aggregate root
  validate(): void {
    if (!this._customerId) {
      throw new Error('Customer ID is required');
    }
    if (this._orderItems.length === 0) {
      throw new Error('Order must contain at least one order item');
    }
    if (!this._shippingAddress) {
      throw new Error('Shipping address is required');
    }
  }
}
