import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepositoryInterface } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../orm/order.typeorm.entity';
import { Repository } from 'typeorm';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { Address } from '../../domain/value-objects/address.vo';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { Money } from '../../domain/value-objects/money.vo';

@Injectable()
export class OrderTypeORMRepository implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  // Save order aggregate
  async save(order: OrderAggregate): Promise<void> {
    const orderEntity = this.toPersistence(order);
    await this.orderRepository.save(orderEntity);
  }

  // Find order by ID
  async findById(id: string): Promise<OrderAggregate> {
    const orderEntity = await this.orderRepository.findOne({ where: { id } });
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    return this.toDomain(orderEntity);
  }

  // Remove order
  async remove(order: OrderAggregate): Promise<void> {
    const orderEntity = this.toPersistence(order);
    await this.orderRepository.remove(orderEntity);
  }

  // Map from OrderAggregate to OrderEntity (Persistence Model)
  private toPersistence(order: OrderAggregate): OrderEntity {
    return {
      id: order.getId(),
      customerId: order.customerId,
      status: order.status,
      totalAmount: order.totalAmount.amount,
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.amount,
        order: null,
      })),
      shippingAddress: {
        street: order.shippingAddress.street,
        city: order.shippingAddress.city,
        postalCode: order.shippingAddress.postalCode,
        country: order.shippingAddress.country,
      },
    };
  }

  // Map from OrderEntity to OrderAggregate (Domain Model)
  private toDomain(orderEntity: OrderEntity): OrderAggregate {
    const order = new OrderAggregate(
      orderEntity.id,
      orderEntity.customerId,
      new Address(
        orderEntity.shippingAddress.street,
        orderEntity.shippingAddress.city,
        orderEntity.shippingAddress.postalCode,
        orderEntity.shippingAddress.country,
      ),
    );
    orderEntity.orderItems.forEach((item) => {
      order.addOrderItem(
        new OrderItem(
          item.id,
          item.productId,
          item.quantity,
          new Money(item.unitPrice, 'USD'),
        ),
      );
    });
    return order;
  }

  delete(id: string): void {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<OrderAggregate[]> {
    throw new Error('Method not implemented.');
  }

  findByCriteria(criteria: any): OrderAggregate[] {
    throw new Error('Method not implemented.');
  }
}
