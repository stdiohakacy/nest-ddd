import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '../../domain/repositories/order.repository.interface';
import { DomainEventPublisher } from '../../infrastructure/messaging/domain-event-publisher';
import { PaymentGateway } from '../../infrastructure/external-services/payment-gateway.ext-service';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { AddItemDTO } from '../dtos/add-item.dto';
import { OrderTypeORMRepository } from '../../infrastructure/persistence/order.typeorm.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderTypeORMRepository,
    private readonly eventPublisher: DomainEventPublisher,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  // Use Case: Create an Order
  async createOrder(createOrderDto: CreateOrderDTO): Promise<string> {
    const order = OrderAggregate.createOrder(createOrderDto);
    await this.orderRepository.save(order);
    return order.getId();
  }

  // Use Case: Complete an Order
  async completeOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    order.markAsCompleted();
    await this.paymentGateway.processPayment(orderId, order.totalAmount.amount);
    await this.orderRepository.save(order);
    this.eventPublisher.publishEvents(order);
  }

  // Use Case: Add Order Item
  async addItemToOrder(orderId: string, itemDto: AddItemDTO): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    const item = new OrderItem(
      itemDto.id,
      itemDto.productId,
      itemDto.quantity,
      itemDto.unitPrice,
    );
    order.addOrderItem(item);
    await this.orderRepository.save(order);
  }
}
