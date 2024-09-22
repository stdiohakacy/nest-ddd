import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/cores/use-case.core';
import { CreateOrderCommand } from '../commands/create-order.command';
import { OrderService } from '../services/order.service';
import { CreateOrderDTO } from '../dtos/create-order.dto';

@Injectable()
export class CreateOrderUseCase
  implements BaseUseCase<CreateOrderCommand, string>
{
  constructor(private readonly orderService: OrderService) {}

  // Thực thi Use Case tạo đơn hàng
  async execute(command: CreateOrderCommand): Promise<string> {
    const createOrderDto = new CreateOrderDTO();

    // Map dữ liệu từ command sang DTO
    createOrderDto.id = '1';
    createOrderDto.customerId = command.customerId;
    createOrderDto.shippingAddress = command.shippingAddress;
    createOrderDto.items = command.items;

    // Sử dụng service để tạo đơn hàng
    return await this.orderService.createOrder(createOrderDto);
  }
}
