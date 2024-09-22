import { BaseRepository } from 'src/cores/repository.core';
import { OrderAggregate } from '../aggregates/order.aggregate';
export interface OrderRepositoryInterface
  extends BaseRepository<OrderAggregate, string> {}
