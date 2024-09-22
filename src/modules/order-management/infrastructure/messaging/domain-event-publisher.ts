import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderAggregate } from '../../domain/aggregates/order.aggregate';

@Injectable()
export class DomainEventPublisher {
  constructor(private eventEmitter: EventEmitter2) {}

  publishEvents(order: OrderAggregate): void {
    const events = order.getDomainEvents();
    events.forEach((event) => {
      this.eventEmitter.emit(event.type, event.data);
    });
    order.clearDomainEvents();
  }
}
