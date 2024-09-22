import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.typeorm.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column()
  status: string;

  @Column()
  totalAmount: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  @JoinColumn()
  orderItems: OrderItemEntity[];

  @Column('jsonb')
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
